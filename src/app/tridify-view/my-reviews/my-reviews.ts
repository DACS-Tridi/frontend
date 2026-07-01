import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { TridifyReviewService } from '../data-access/services/tridify-review.service';
import { TridifyUserService } from '../data-access/services/tridify-user.service';
import { USER_PROFILE_FIXTURE } from '../data-access/fixtures';
import { ReviewHighlight, TridifyUserProfile, getAvatarPath } from '../models/discovery.models';

type SortKey = 'recent' | 'rating' | 'likes';

@Component({
  selector: 'app-my-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-reviews.html',
  styleUrls: ['./my-reviews.css']
})
export class MyReviewsComponent implements OnInit {
  private readonly reviewService = inject(TridifyReviewService);
  private readonly userService = inject(TridifyUserService);
  private readonly router = inject(Router);

  private readonly reviewsSubject = new BehaviorSubject<ReviewHighlight[]>([]);
  private readonly userProfileSubject = new BehaviorSubject<TridifyUserProfile | null>(null);

  protected readonly reviews$ = this.reviewsSubject.asObservable();
  protected readonly userProfile$ = this.userProfileSubject.asObservable();

  protected isLoading = true;
  protected activeSortKey: SortKey = 'recent';
  protected mobileMenuOpen = false;

  protected readonly sortOptions: { key: SortKey; label: string }[] = [
    { key: 'recent', label: 'MÁS RECIENTES' },
    { key: 'rating', label: 'MEJOR RATING' },
    { key: 'likes', label: 'MÁS LIKES' }
  ];

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadMyReviews();
  }

  protected sortBy(key: SortKey): void {
    this.activeSortKey = key;
    const sorted = this.sortReviews([...this.reviewsSubject.getValue()], key);
    this.reviewsSubject.next(sorted);
  }

  protected goToAlbum(albumId: string): void {
    this.router.navigate(['/tridify/albums', albumId]);
  }

  protected goToNewReview(): void {
    this.router.navigate(['/tridify/reviews/new']);
  }

  protected backToDiscover(): void {
    this.router.navigate(['/tridify']);
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

  protected getVuBars(rating: number): number[] {
    const base = rating / 5;
    const multipliers = [0.62, 1.0, 0.88, 0.58, 0.36];
    return multipliers.map(m => Math.max(6, Math.round(base * m * 100)));
  }

  protected getUserInitial(user: string | null | undefined): string {
    return user ? user.charAt(0).toUpperCase() : '?';
  }

  protected getTotalStats(): { reviews: number; likes: number; comments: number } {
    const reviews = this.reviewsSubject.getValue();
    return {
      reviews: reviews.length,
      likes: reviews.reduce((acc, r) => acc + r.stats.likes, 0),
      comments: reviews.reduce((acc, r) => acc + r.stats.comments, 0)
    };
  }

  protected getCoverStyle(cover: string): Record<string, string> {
    if (!cover) return {};
    const isUrl = /^https?:\/\//.test(cover) || cover.startsWith('/');
    return isUrl
      ? { 'background-image': `url(${cover})`, 'background-size': 'cover', 'background-position': 'center' }
      : { 'background': cover };
  }

  protected getAverageRating(): number {
    const reviews = this.reviewsSubject.getValue();
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  private loadMyReviews(): void {
    this.isLoading = true;
    this.reviewService
      .getMyReviews()
      .pipe(
        take(1),
        catchError(() => of([]))
      )
      .subscribe(reviews => {
        const sorted = this.sortReviews(reviews, this.activeSortKey);
        this.reviewsSubject.next(sorted);
        this.isLoading = false;
      });
  }

  private loadUserProfile(): void {
    this.userService
      .getUserProfile()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture user profile after API error', error);
          return of(USER_PROFILE_FIXTURE);
        })
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
