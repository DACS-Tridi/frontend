import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { TridifyReviewService } from '../data-access/services/tridify-review.service';
import { TridifyUserService } from '../data-access/services/tridify-user.service';
import { MY_REVIEWS_FIXTURE } from '../data-access/fixtures/my-reviews.fixtures';
import { USER_PROFILE_FIXTURE } from '../data-access/fixtures';
import { ReviewHighlight, TridifyUserProfile, getAvatarPath } from '../models/discovery.models';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfileComponent implements OnInit {
  private readonly reviewService = inject(TridifyReviewService);
  private readonly userService = inject(TridifyUserService);
  private readonly router = inject(Router);

  private readonly reviewsSubject = new BehaviorSubject<ReviewHighlight[]>([]);
  private readonly userProfileSubject = new BehaviorSubject<TridifyUserProfile | null>(null);

  protected readonly reviews$ = this.reviewsSubject.asObservable();
  protected readonly userProfile$ = this.userProfileSubject.asObservable();

  protected isLoading = true;
  protected mobileMenuOpen = false;

  /** mensaje transitorio "no implementado" para botones sin funcionalidad */
  protected toast = '';
  private toastTimer?: ReturnType<typeof setTimeout>;
  protected notYet(label: string): void {
    this.toast = `🚧 "${label}" todavía no está implementado`;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = ''), 2500);
  }


  ngOnInit(): void {
    this.loadUserProfile();
    this.loadMyReviews();
  }

  protected getTotalStats(): { reviews: number; likes: number; comments: number } {
    const reviews = this.reviewsSubject.getValue();
    return {
      reviews: reviews.length,
      likes: reviews.reduce((acc, r) => acc + r.stats.likes, 0),
      comments: reviews.reduce((acc, r) => acc + r.stats.comments, 0)
    };
  }

  protected getAverageRating(): number {
    const reviews = this.reviewsSubject.getValue();
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  protected getCoverStyle(cover: string): Record<string, string> {
    if (!cover) return {};
    const isUrl = /^https?:\/\//.test(cover) || cover.startsWith('/');
    return isUrl
      ? { 'background-image': `url(${cover})`, 'background-size': 'cover', 'background-position': 'center' }
      : { 'background': cover };
  }

  protected getVuBars(rating: number): number[] {
    const base = rating / 5;
    const multipliers = [0.62, 1.0, 0.88, 0.58, 0.36];
    return multipliers.map(m => Math.max(6, Math.round(base * m * 100)));
  }

  protected getUserInitial(user: string | null | undefined): string {
    return user ? user.charAt(0).toUpperCase() : '?';
  }

  protected getAvatarSrc(avatarId?: string): string {
    return getAvatarPath(avatarId as any);
  }

  protected goToMyReviews(): void {
    this.router.navigate(['/tridify/my-reviews']);
  }

  protected goToNewReview(): void {
    this.router.navigate(['/tridify/reviews/new']);
  }

  protected backToDiscover(): void {
    this.router.navigate(['/tridify']);
  }

  protected goToAlbum(albumId: string): void {
    this.router.navigate(['/tridify/albums', albumId]);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  protected reviewTrackBy(_: number, review: ReviewHighlight): number {
    return review.id;
  }

  private loadMyReviews(): void {
    this.isLoading = true;
    this.reviewService
      .getMyReviews()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture reviews after API error', error);
          return of(MY_REVIEWS_FIXTURE);
        })
      )
      .subscribe(reviews => {
        this.reviewsSubject.next(reviews);
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
}
