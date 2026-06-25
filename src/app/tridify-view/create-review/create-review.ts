import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { TridifyAlbumService } from '../data-access/services/tridify-album.service';
import { TridifyReviewService } from '../data-access/services/tridify-review.service';
import { ReviewHighlight, SearchResultItem } from '../models/discovery.models';
import { ReviewCreatePayload, ReviewCreateRequest } from '../models/review-create.models';

type ReviewCreateControlName = 'albumId' | 'highlight' | 'rating' | 'tags' | 'tone' | 'reviewBody';

interface ReviewCreateFormValue {
  albumId: string;
  highlight: string;
  rating: number | null;
  tags: string;
  tone: string;
  reviewBody: string;
}

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-review.html',
  styleUrls: ['./create-review.css']
})
export class CreateReviewComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly albumService = inject(TridifyAlbumService);
  private readonly reviewService = inject(TridifyReviewService);
  private readonly destroy$ = new Subject<void>();

  protected readonly toneOptions = [
    { value: 'violet', label: 'Violet' },
    { value: 'cyan', label: 'Cyan' }
  ];

  protected readonly reviewForm = this.fb.group({
    albumId: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{22}$/)
      ]
    }),
    highlight: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(320)]
    }),
    rating: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.max(5)]
    }),
    tags: this.fb.control('', {
      validators: [Validators.maxLength(200)]
    }),
    tone: this.fb.control('violet', {
      validators: [Validators.required]
    }),
    reviewBody: this.fb.control('', {
      validators: [Validators.maxLength(2000)]
    })
  });

  protected readonly albumSearchControl = new FormControl('', { nonNullable: true });

  protected isSubmitting = false;
  protected submitSuccess = false;
  protected submitError = '';
  protected createdReview?: ReviewHighlight;
  protected lastDraft?: ReviewCreateRequest;
  protected albumResults: SearchResultItem[] = [];
  protected albumSearchLoading = false;
  protected albumSearchError = '';
  protected selectedAlbum?: SearchResultItem;

  ngOnInit(): void {
    this.listenToAlbumSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected get tagsPreview(): string[] {
    return this.parseTags(this.reviewForm.controls.tags.value);
  }

  protected selectAlbum(result: SearchResultItem): void {
    const id = this.extractSpotifyId(result);
    if (!id) {
      this.albumSearchError = 'We could not find a valid Spotify ID for this album.';
      return;
    }

    this.albumSearchError = '';
    this.reviewForm.controls.albumId.setValue(id);
    this.reviewForm.controls.albumId.markAsDirty();
    this.reviewForm.controls.albumId.updateValueAndValidity();
    this.selectedAlbum = result;
  }

  protected clearSelectedAlbum(): void {
    this.selectedAlbum = undefined;
    this.reviewForm.controls.albumId.reset('');
  }

  protected submit(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const rawValue = this.reviewForm.getRawValue() as ReviewCreateFormValue;
    const payload: ReviewCreatePayload = {
      albumId: rawValue.albumId.trim(),
      highlight: rawValue.highlight.trim(),
      rating: Number(rawValue.rating),
      tags: this.parseTags(rawValue.tags),
      tone: rawValue.tone,
      reviewBody: rawValue.reviewBody.trim()
    };

    this.lastDraft = payload;

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    this.reviewService
      .createReview(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: review => {
          this.createdReview = review;
          this.submitSuccess = true;
          this.isSubmitting = false;
        },
        error: error => {
          this.submitError = this.resolveErrorMessage(error);
          this.submitSuccess = false;
          this.isSubmitting = false;
        }
      });
  }

  protected resetForm(): void {
    this.reviewForm.reset({
      albumId: '',
      highlight: '',
      rating: null,
      tags: '',
      tone: 'violet',
      reviewBody: ''
    });
    this.submitSuccess = false;
    this.submitError = '';
    this.createdReview = undefined;
    this.lastDraft = undefined;
    this.albumResults = [];
    this.selectedAlbum = undefined;
    this.albumSearchControl.setValue('');
  }

  protected isInvalid(controlName: ReviewCreateControlName): boolean {
    const control = this.reviewForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  protected showError(controlName: ReviewCreateControlName, errorCode: string): boolean {
    const control = this.reviewForm.controls[controlName];
    return !!control.errors?.[errorCode] && (control.dirty || control.touched);
  }

  private parseTags(raw: string | null): string[] {
    if (!raw) {
      return [];
    }

    return raw
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }

  private resolveErrorMessage(error: unknown): string {
    if (typeof error === 'string' && error.trim()) {
      return error;
    }

    if (error && typeof error === 'object') {
      const maybeError = error as { errorDescription?: string; message?: string };
      if (maybeError.errorDescription) {
        return maybeError.errorDescription;
      }
      if (maybeError.message) {
        return maybeError.message;
      }
    }

    return 'We could not create the review. Please try again in a few seconds.';
  }

  private listenToAlbumSearch(): void {
    this.albumSearchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map(value => value.trim()),
        tap(value => {
          this.albumSearchError = '';
          this.albumResults = [];
          if (!value) {
            this.albumSearchLoading = false;
          }
        }),
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => value.length >= 2),
        tap(() => {
          this.albumSearchLoading = true;
          this.albumSearchError = '';
        }),
        switchMap(term => this.performAlbumSearch(term))
      )
      .subscribe(results => {
        this.albumResults = results;
        this.albumSearchLoading = false;
      });
  }

  private performAlbumSearch(term: string): Observable<SearchResultItem[]> {
    return this.albumService.searchAlbums({ term }).pipe(
      map(results => results.filter(result => result.type === 'album')),
      catchError(() => {
        this.albumSearchError = 'We could not search albums right now.';
        return of([]);
      }),
      finalize(() => {
        this.albumSearchLoading = false;
      })
    );
  }

  private extractSpotifyId(result: SearchResultItem): string | null {
    const fromMetadata = (result.metadata?.['spotifyId'] ?? result.metadata?.['id'] ?? result.metadata?.['albumId']) as
      | string
      | number
      | undefined;

    if (typeof fromMetadata === 'string') {
      return fromMetadata.trim();
    }

    if (typeof fromMetadata === 'number') {
      return `${fromMetadata}`.trim();
    }

    if (typeof result.id === 'string') {
      return result.id.trim();
    }

    if (typeof result.id === 'number') {
      return `${result.id}`.trim();
    }

    return null;
  }
}
