import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TridifyReviewService } from '../data-access/services/tridify-review.service';
import { ReviewHighlight } from '../models/discovery.models';
import { ReviewCreatePayload, ReviewCreateRequest } from '../models/review-create.models';

type ReviewCreateControlName = 'albumId' | 'highlight' | 'rating' | 'tags' | 'tone' | 'reviewBody';

interface ReviewCreateFormValue {
  albumId: number | null;
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
export class CreateReviewComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly reviewService = inject(TridifyReviewService);
  private readonly destroy$ = new Subject<void>();

  protected readonly toneOptions = [
    { value: 'violet', label: 'Violeta' },
    { value: 'cyan', label: 'Cian' }
  ];

  protected readonly reviewForm = this.fb.group({
    albumId: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(1)]
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

  protected isSubmitting = false;
  protected submitSuccess = false;
  protected submitError = '';
  protected createdReview?: ReviewHighlight;
  protected lastDraft?: ReviewCreateRequest;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected get tagsPreview(): string[] {
    return this.parseTags(this.reviewForm.controls.tags.value);
  }

  protected submit(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const rawValue = this.reviewForm.getRawValue() as ReviewCreateFormValue;
    const payload: ReviewCreatePayload = {
      albumId: Number(rawValue.albumId),
      highlight: rawValue.highlight.trim(),
      rating: Number(rawValue.rating),
      tags: this.parseTags(rawValue.tags),
      tone: rawValue.tone
    };

    this.lastDraft = {
      ...payload,
      reviewBody: rawValue.reviewBody.trim()
    };

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
      albumId: null,
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

    return 'No pudimos crear la review. Probá de nuevo en unos segundos.';
  }
}
