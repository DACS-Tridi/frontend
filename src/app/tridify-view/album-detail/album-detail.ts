import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TridifyAlbumService } from '../data-access/services/tridify-album.service';
import { TridifyUserService } from '../data-access/services/tridify-user.service';
import { USER_PROFILE_FIXTURE } from '../data-access/fixtures';
import {
  AlbumDetail,
  AlbumReviewsResponse,
  ReviewHighlight,
  TridifyUserProfile,
  getAvatarPath
} from '../models/discovery.models';

interface AlbumPageData {
  album: AlbumDetail | null;
  reviewsData: AlbumReviewsResponse | null;
  error: string | null;
}

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-detail.html',
  styleUrls: ['./album-detail.css']
})
export class AlbumDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly albumService = inject(TridifyAlbumService);
  private readonly userService = inject(TridifyUserService);

  private readonly userProfileSubject = new BehaviorSubject<TridifyUserProfile | null>(null);
  protected readonly userProfile$ = this.userProfileSubject.asObservable();

  protected pageData$!: Observable<AlbumPageData>;
  protected mobileMenuOpen = false;

  ngOnInit(): void {
    this.loadUserProfile();

    this.pageData$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') ?? '';
        return combineLatest([
          this.albumService.getAlbumDetail(id).pipe(catchError(() => of(null))),
          this.albumService.getAlbumReviews(id).pipe(catchError(() => of(null)))
        ]).pipe(
          map(([album, reviewsData]) => ({
            album,
            reviewsData,
            error: album === null ? 'No se pudo cargar el álbum.' : null
          }))
        );
      })
    );
  }

  protected getAlbumId(): string {
    return this.route.snapshot.paramMap.get('id') ?? '';
  }

  protected goToNewReview(): void {
    this.router.navigate(['/tridify/reviews/new'], { queryParams: { albumId: this.getAlbumId() } });
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

  protected getCoverStyle(imageUrl: string | null | undefined): Record<string, string> {
    if (!imageUrl) return {};
    return { 'background-image': `url(${imageUrl})`, 'background-size': 'cover', 'background-position': 'center' };
  }

  protected getVuBars(rating: number): number[] {
    const base = rating / 5;
    const multipliers = [0.62, 1.0, 0.88, 0.58, 0.36];
    return multipliers.map(m => Math.max(6, Math.round(base * m * 100)));
  }

  protected getUserInitial(user: string | null | undefined): string {
    return user ? user.charAt(0).toUpperCase() : '?';
  }

  protected reviewTrackBy(_: number, review: ReviewHighlight): number {
    return review.id;
  }

  private loadUserProfile(): void {
    this.userService
      .getUserProfile()
      .pipe(catchError(error => {
        console.warn('Using fixture user profile after API error', error);
        return of(USER_PROFILE_FIXTURE);
      }))
      .subscribe(profile => this.userProfileSubject.next(profile));
  }
}
