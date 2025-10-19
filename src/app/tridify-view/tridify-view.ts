import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TridifyDiscoveryStore } from './data-access/tridify-discovery.store';
import { GenreChip, ReviewHighlight, ReviewerSpotlight } from './models/discovery.models';

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

  protected mobileMenuOpen = false;

  protected readonly navigationPrimary = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🧭', label: 'Explore', active: false },
    { icon: '👤', label: 'My Profile', active: false }
  ];

  protected readonly navigationLibrary = [
    { icon: '📝', label: 'My Reviews' },
    { icon: '⭐', label: 'Favorite Reviews' },
    { icon: '🗂️', label: 'Review Drafts' }
  ];

  protected readonly navigationCommunity = [
    { icon: '🔥', label: 'Popular Reviews' },
    { icon: '🎧', label: 'Top Reviews' },
    { icon: '🎯', label: 'Daily Challenge' }
  ];

  protected readonly userProfile$ = this.discoveryStore.userProfile$;
  protected readonly topReviews$ = this.discoveryStore.topReviews$;
  protected readonly topReviewers$ = this.discoveryStore.topReviewers$;
  protected readonly genres$ = this.discoveryStore.genres$;
  protected readonly dailyChallenge$ = this.discoveryStore.dailyChallenge$;

  protected readonly searchForm = this.fb.nonNullable.group({
    term: ['']
  });

  protected readonly reviewTrackBy = (_: number, review: ReviewHighlight) => review.id;
  protected readonly reviewerTrackBy = (_: number, reviewer: ReviewerSpotlight) => reviewer.id;
  protected readonly genreTrackBy = (_: number, genre: GenreChip) => genre.id;

  ngOnInit(): void {
    this.discoveryStore.initialize();

    this.searchForm.controls.term.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(value => {
        if (!value.trim()) {
          this.discoveryStore.clearSearch();
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
    const term = this.searchForm.controls.term.value;
    this.discoveryStore.search(term);
  }

  protected getRatingStars(rating: number): Array<'full' | 'half' | 'empty'> {
    const stars: Array<'full' | 'half' | 'empty'> = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalf && stars.length < 5) {
      stars.push('half');
    }
    while (stars.length < 5) {
      stars.push('empty');
    }
    return stars;
  }
}
