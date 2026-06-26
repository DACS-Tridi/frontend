import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { TridifyReviewService } from '../data-access/services/tridify-review.service';
import { TridifyUserService } from '../data-access/services/tridify-user.service';
import { USER_PROFILE_FIXTURE } from '../data-access/fixtures';
import { ReviewHighlight, TridifyUserProfile, getAvatarPath } from '../models/discovery.models';

type SortKey = 'recent' | 'rating' | 'likes';

@Component({
  selector: 'app-top-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-reviews.html',
  styleUrls: ['./top-reviews.css']
})
export class TopReviewsComponent implements OnInit {
  private readonly reviewService = inject(TridifyReviewService);
  private readonly userService = inject(TridifyUserService);
  private readonly router = inject(Router);

  private readonly allReviewsSubject = new BehaviorSubject<ReviewHighlight[]>([]);
  private readonly userProfileSubject = new BehaviorSubject<TridifyUserProfile | null>(null);
  private readonly activeTagSubject = new BehaviorSubject<string | null>(null);
  private readonly sortKeySubject = new BehaviorSubject<SortKey>('likes');

  protected readonly userProfile$ = this.userProfileSubject.asObservable();
  protected readonly activeTag$ = this.activeTagSubject.asObservable();
  protected readonly activeSortKey$ = this.sortKeySubject.asObservable();

  /** Unique tags extracted from all loaded reviews, sorted alphabetically. */
  protected readonly availableTags$ = this.allReviewsSubject.pipe(
    map(reviews => {
      const tagSet = new Set<string>();
      reviews.forEach(r => r.tags?.forEach(t => tagSet.add(t)));
      return [...tagSet].sort((a, b) => a.localeCompare(b));
    })
  );

  protected readonly filteredReviews$ = combineLatest([
    this.allReviewsSubject,
    this.activeTagSubject,
    this.sortKeySubject
  ]).pipe(
    map(([reviews, tag, sortKey]) => {
      const result = tag
        ? reviews.filter(r => r.tags?.includes(tag))
        : reviews;
      return this.sortReviews(result, sortKey);
    })
  );

  protected isLoading = true;
  protected mobileMenuOpen = false;

  protected readonly sortOptions: { key: SortKey; label: string; icon: string }[] = [
    { key: 'likes',  label: 'MÁS LIKEADAS', icon: '❤' },
    { key: 'rating', label: 'MEJOR RATING',  icon: '⭐' },
    { key: 'recent', label: 'MÁS RECIENTES', icon: '🕐' }
  ];

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadAllReviews();
  }

  protected selectTag(tag: string | null): void {
    const current = this.activeTagSubject.getValue();
    this.activeTagSubject.next(current === tag ? null : tag);
  }

  protected sortBy(key: SortKey): void {
    this.sortKeySubject.next(key);
  }

  protected goToAlbum(albumId: string): void {
    this.router.navigate(['/tridify/albums', albumId]);
  }

  protected backToDiscover(): void {
    this.router.navigate(['/tridify']);
  }

  protected goToNewReview(): void {
    this.router.navigate(['/tridify/reviews/new']);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  protected getAvatarSrc(avatarId?: string): string {
    return getAvatarPath(avatarId as any);
  }

  protected reviewTrackBy(_: number, review: ReviewHighlight): number {
    return review.id;
  }

  protected tagTrackBy(_: number, tag: string): string {
    return tag;
  }

  protected getVuBars(rating: number): number[] {
    const base = rating / 5;
    const multipliers = [0.62, 1.0, 0.88, 0.58, 0.36];
    return multipliers.map(m => Math.max(6, Math.round(base * m * 100)));
  }

  protected getCoverStyle(cover: string | null | undefined): Record<string, string> {
    if (!cover) {
      return { background: 'linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 100%)' };
    }
    const isUrl = /^https?:\/\//.test(cover) || cover.startsWith('/');
    return isUrl
      ? { 'background-image': `url(${cover})`, 'background-size': 'cover', 'background-position': 'center' }
      : { background: cover };
  }

  protected getUserInitial(user: string): string {
    return user ? user.charAt(0).toUpperCase() : '?';
  }

  protected getTagColor(tag: string): string {
    const palette = [
      '#7367f0', '#17ead9', '#f76b8a', '#ff9f43',
      '#5f27cd', '#48dbfb', '#ff6b6b', '#1dd1a1',
      '#54a0ff', '#feca57', '#a29bfe', '#fd79a8'
    ];
    let hash = 0;
    for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    return palette[Math.abs(hash) % palette.length];
  }

  protected getReviewCount(reviews: ReviewHighlight[] | null): number {
    return reviews?.length ?? 0;
  }

  protected getTotalLikes(reviews: ReviewHighlight[] | null): number {
    return reviews?.reduce((acc, r) => acc + r.stats.likes, 0) ?? 0;
  }

  private loadAllReviews(): void {
    this.isLoading = true;
    this.reviewService
      .getAllReviews()
      .pipe(
        take(1),
        catchError(() => of([] as ReviewHighlight[]))
      )
      .subscribe(reviews => {
        this.allReviewsSubject.next(reviews);
        this.isLoading = false;
      });
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

  private sortReviews(reviews: ReviewHighlight[], key: SortKey): ReviewHighlight[] {
    switch (key) {
      case 'rating':
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case 'likes':
        return [...reviews].sort((a, b) => b.stats.likes - a.stats.likes);
      case 'recent':
      default:
        return [...reviews].sort(
          (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
    }
  }
}
