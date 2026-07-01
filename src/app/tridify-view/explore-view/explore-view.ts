import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap,
  takeUntil
} from 'rxjs/operators';

import { TridifyAlbumService } from '../data-access/services/tridify-album.service';
import { TridifyUserService } from '../data-access/services/tridify-user.service';
import { USER_PROFILE_FIXTURE } from '../data-access/fixtures';
import { SearchResultItem, TridifyUserProfile, getAvatarPath } from '../models/discovery.models';

type ExploreFilter = 'all' | 'album' | 'track';

@Component({
  selector: 'app-explore-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './explore-view.html',
  styleUrls: ['./explore-view.css']
})
export class ExploreViewComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly albumService = inject(TridifyAlbumService);
  private readonly userService = inject(TridifyUserService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  private readonly userProfileSubject = new BehaviorSubject<TridifyUserProfile | null>(null);

  protected readonly userProfile$ = this.userProfileSubject.asObservable();
  protected readonly searchControl = this.fb.nonNullable.control('');

  protected mobileMenuOpen = false;

  /** mensaje transitorio "no implementado" para botones sin funcionalidad */
  protected toast = '';
  private toastTimer?: ReturnType<typeof setTimeout>;
  protected notYet(label: string): void {
    this.toast = `🚧 "${label}" todavía no está implementado`;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = ''), 2500);
  }

  protected activeFilter: ExploreFilter = 'all';
  protected isSearching = false;
  protected hasSearched = false;
  protected allResults: SearchResultItem[] = [];
  protected selectedItem: SearchResultItem | null = null;

  protected readonly filterOptions: { id: ExploreFilter; label: string; icon: string }[] = [
    { id: 'all',   label: 'TODOS',     icon: '◈' },
    { id: 'album', label: 'DISCOS',    icon: '💿' },
    { id: 'track', label: 'CANCIONES', icon: '♪'  }
  ];

  get filteredResults(): SearchResultItem[] {
    if (this.activeFilter === 'all') return this.allResults;
    return this.allResults.filter(r => r.type === this.activeFilter);
  }

  get hasQuery(): boolean {
    return this.searchControl.value.trim().length > 0;
  }

  get albumCount(): number { return this.allResults.filter(r => r.type === 'album').length; }
  get trackCount(): number { return this.allResults.filter(r => r.type === 'track').length; }

  ngOnInit(): void {
    this.loadUserProfile();

    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map(v => v.trim()),
        tap(v => {
          if (!v) {
            this.allResults = [];
            this.hasSearched = false;
            this.isSearching = false;
            this.selectedItem = null;
          }
        }),
        debounceTime(350),
        distinctUntilChanged(),
        filter(v => v.length >= 2),
        tap(() => {
          this.isSearching = true;
          this.hasSearched = false;
        }),
        switchMap(term =>
          this.albumService.searchAlbums({ term }).pipe(
            map(results => results.filter(r => r.type === 'album' || r.type === 'track')),
            catchError(() => of([])),
            finalize(() => {
              this.isSearching = false;
              this.hasSearched = true;
            })
          )
        )
      )
      .subscribe(results => {
        this.allResults = results;
        this.isSearching = false;
        this.hasSearched = true;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected toggleMobileMenu(): void { this.mobileMenuOpen = !this.mobileMenuOpen; }
  protected closeMobileMenu(): void  { this.mobileMenuOpen = false; }

  protected getAvatarSrc(avatarId?: string): string {
    return getAvatarPath(avatarId as any);
  }

  protected setFilter(f: ExploreFilter): void { this.activeFilter = f; }

  protected toggleSelect(item: SearchResultItem): void {
    this.selectedItem = this.selectedItem?.id === item.id ? null : item;
  }

  protected isSelected(item: SearchResultItem): boolean {
    return this.selectedItem?.id === item.id;
  }

  protected clearSearch(): void {
    this.searchControl.setValue('');
    this.allResults = [];
    this.selectedItem = null;
    this.hasSearched = false;
  }

  protected goToAlbum(): void {
    if (!this.selectedItem) return;
    const id = this.selectedItem.metadata?.['spotifyId'] ?? this.selectedItem.id;
    this.router.navigate(['/tridify/albums', id]);
  }

  protected goToReview(): void {
    this.router.navigate(['/tridify/reviews/new']);
  }

  protected getTypeLabel(type: string): string {
    const map: Record<string, string> = { album: 'DISCO', track: 'CANCIÓN' };
    return map[type] ?? type.toUpperCase();
  }

  protected getTrackIndex(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  protected trackBy(_: number, item: SearchResultItem): string | number {
    return item.id;
  }

  private loadUserProfile(): void {
    this.userService
      .getUserProfile()
      .pipe(
        take(1),
        catchError(() => of(USER_PROFILE_FIXTURE))
      )
      .subscribe(profile => this.userProfileSubject.next(profile));
  }
}
