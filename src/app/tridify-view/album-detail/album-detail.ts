import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TridifyAlbumService } from '../data-access/services/tridify-album.service';
import { AlbumDetail, AlbumReviewsResponse, ReviewHighlight } from '../models/discovery.models';

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
  private readonly albumService = inject(TridifyAlbumService);

  protected pageData$!: Observable<AlbumPageData>;
  protected loading = true;

  ngOnInit(): void {
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

  protected getRatingStars(rating: number): Array<'full' | 'half' | 'empty'> {
    const stars: Array<'full' | 'half' | 'empty'> = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push('full');
    if (hasHalf && stars.length < 5) stars.push('half');
    while (stars.length < 5) stars.push('empty');
    return stars;
  }

  protected reviewTrackBy(_: number, review: ReviewHighlight): number {
    return review.id;
  }
}
