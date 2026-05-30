import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TridifyDiscoveryStore } from './data-access/tridify-discovery.store';
import { GenreChip, ReviewHighlight, ReviewerSpotlight, SearchResultItem } from './models/discovery.models';

@Component({
  selector: 'app-tridify-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tridify-view.html',
  styleUrls: ['./tridify-view.css']
})
export class TridifyViewComponent implements OnInit {
  private readonly discoveryStore = inject(TridifyDiscoveryStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected mobileMenuOpen = false;
  protected showSearchResults = false;

  protected readonly navigationPrimary = [
    { icon: '🏠', label: 'Inicio', active: true },
    { icon: '🧭', label: 'Explorá', active: false },
    { icon: '👤', label: 'Mi Perfil', active: false }
  ];

  protected readonly navigationLibrary = [
    { icon: '📝', label: 'Mis Reviews' },
    { icon: '⭐', label: 'Reviews Favoritas' },
    { icon: '🗂️', label: 'Borradores' }
  ];

  protected readonly navigationCommunity = [
    { icon: '🔥', label: 'Lo Más Piola' },
    { icon: '🎧', label: 'Top Reviews' },
    { icon: '🎯', label: 'Desafío del Día' }
  ];

  private readonly EQ_FADER_PATTERNS: Record<number, number[]> = {
    1: [45, 72, 88, 60, 78, 52, 30],
    2: [62, 48, 34, 70, 84, 56, 42],
    3: [80, 65, 52, 74, 38, 62, 88]
  };

  private readonly FADER_LABELS = ['32', '64', '125', '250', '500', '1K', '2K'];

  protected readonly userProfile$ = this.discoveryStore.userProfile$;
  protected readonly topReviews$ = this.discoveryStore.topReviews$;
  protected readonly topReviewers$ = this.discoveryStore.topReviewers$;
  protected readonly genres$ = this.discoveryStore.genres$;
  protected readonly dailyChallenge$ = this.discoveryStore.dailyChallenge$;
  protected readonly searchResults$ = this.discoveryStore.searchResults$;

  protected readonly searchForm = this.fb.nonNullable.group({
    term: ['']
  });

  protected readonly reviewTrackBy = (_: number, review: ReviewHighlight) => review.id;
  protected readonly reviewerTrackBy = (_: number, reviewer: ReviewerSpotlight) => reviewer.id;
  protected readonly genreTrackBy = (_: number, genre: GenreChip) => genre.id;
  protected readonly searchResultTrackBy = (_: number, item: SearchResultItem) => item.id;

  ngOnInit(): void {
    this.discoveryStore.initialize();

    this.searchForm.controls.term.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(value => {
        if (!value.trim()) {
          this.discoveryStore.clearSearch();
          this.showSearchResults = false;
        }
      });
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  protected submitSearch(): void {
    const term = this.searchForm.controls.term.value.trim();
    if (!term) return;
    this.discoveryStore.search(term);
    this.showSearchResults = true;
  }

  protected selectSearchResult(result: SearchResultItem): void {
    const id = result.metadata?.['spotifyId'] ?? result.id;
    this.showSearchResults = false;
    this.searchForm.controls.term.setValue('');
    this.discoveryStore.clearSearch();
    this.router.navigate(['/tridify/albums', id]);
  }

  protected clearSearch(): void {
    this.showSearchResults = false;
    this.searchForm.controls.term.setValue('');
    this.discoveryStore.clearSearch();
  }

  protected getUserInitial(user: string | null | undefined): string {
    return user ? user.charAt(0).toUpperCase() : '?';
  }

  /** Returns five bar heights (0–100) for the VU-meter rating display. */
  protected getVuBars(rating: number): number[] {
    const base = rating / 5;
    const multipliers = [0.62, 1.0, 0.88, 0.58, 0.36];
    return multipliers.map(m => Math.max(6, Math.round(base * m * 100)));
  }

  /** Returns seven fader positions (0–100, where 100 = top/loud). */
  protected getEqFaders(reviewerId: number): number[] {
    return this.EQ_FADER_PATTERNS[reviewerId] ?? [50, 60, 72, 55, 66, 46, 74];
  }

  /** Zero-padded track number string, e.g. index 0 → "01". */
  protected getTrackNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  /** Returns the Hz label for a fader column by its index. */
  protected getFaderLabel(index: number): string {
    return this.FADER_LABELS[index] ?? '';
  }

  /** @deprecated kept for backward compatibility; VU meter replaces stars. */
  protected getRatingStars(rating: number): Array<'full' | 'half' | 'empty'> {
    const stars: Array<'full' | 'half' | 'empty'> = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push('full');
    if (hasHalf && stars.length < 5) stars.push('half');
    while (stars.length < 5) stars.push('empty');
    return stars;
  }
}
