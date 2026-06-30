import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import {
  DailyChallenge,
  GenreChip,
  ReviewHighlight,
  ReviewerSpotlight,
  SearchResultItem,
  TridifyUserProfile,
  UpcomingAlbum
} from '../models/discovery.models';
import {
  DAILY_CHALLENGE_FIXTURE,
  GENRES_FIXTURE,
  MY_REVIEWS_FIXTURE,
  TOP_REVIEWS_FIXTURE,
  TOP_REVIEWERS_FIXTURE,
  TRIDIFY_DISCOVERY_SEARCH_FIXTURE,
  UPCOMING_ALBUMS_FIXTURE,
  USER_PROFILE_FIXTURE
} from './fixtures';
import { TridifyAlbumService } from './services/tridify-album.service';
import { TridifyGenreService } from './services/tridify-genre.service';
import { TridifyReviewService } from './services/tridify-review.service';
import { TridifyReviewerService } from './services/tridify-reviewer.service';
import { TridifyUserService } from './services/tridify-user.service';

@Injectable({
  providedIn: 'root'
})

export class TridifyDiscoveryStore {
  private readonly userProfileSubject = new BehaviorSubject<TridifyUserProfile | null>(null);
  private readonly topReviewsSubject = new BehaviorSubject<ReviewHighlight[]>([]);
  private readonly topReviewersSubject = new BehaviorSubject<ReviewerSpotlight[]>([]);
  private readonly genresSubject = new BehaviorSubject<GenreChip[]>([]);
  private readonly dailyChallengeSubject = new BehaviorSubject<DailyChallenge | null>(null);
  private readonly upcomingAlbumsSubject = new BehaviorSubject<UpcomingAlbum[]>([]);
  private readonly searchResultsSubject = new BehaviorSubject<SearchResultItem[]>([]);
  private readonly myReviewsSubject = new BehaviorSubject<ReviewHighlight[]>([]);

  readonly userProfile$ = this.userProfileSubject.asObservable();
  readonly topReviews$ = this.topReviewsSubject.asObservable();
  readonly topReviewers$ = this.topReviewersSubject.asObservable();
  readonly genres$ = this.genresSubject.asObservable();
  readonly dailyChallenge$ = this.dailyChallengeSubject.asObservable();
  readonly upcomingAlbums$ = this.upcomingAlbumsSubject.asObservable();
  readonly searchResults$ = this.searchResultsSubject.asObservable();
  readonly myReviews$ = this.myReviewsSubject.asObservable();

  constructor(
    private readonly userService: TridifyUserService,
    private readonly reviewService: TridifyReviewService,
    private readonly reviewerService: TridifyReviewerService,
    private readonly genreService: TridifyGenreService,
    private readonly albumService: TridifyAlbumService
  ) {}

  initialize(): void {
    this.loadUserProfile();
    this.loadTopReviews();
    this.loadReviewerSpotlights();
    this.loadGenres();
    this.loadDailyChallenge();
    this.loadUpcomingAlbums();
  }

  search(term: string): void {
    const sanitized = term.trim();
    if (!sanitized) {
      this.clearSearch();
      return;
    }

    this.albumService
      .searchAlbums({ term: sanitized })
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Falling back to fixture search results', error);
          return of(TRIDIFY_DISCOVERY_SEARCH_FIXTURE(sanitized));
        })
      )
      .subscribe(results => this.searchResultsSubject.next(results));
  }

  clearSearch(): void {
    this.searchResultsSubject.next([]);
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

  private loadTopReviews(): void {
    this.reviewService
      .getTopReviewsForToday()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture reviews after API error', error);
          return of(TOP_REVIEWS_FIXTURE);
        })
      )
      .subscribe(reviews => this.topReviewsSubject.next(reviews));
  }

  private loadReviewerSpotlights(): void {
    this.reviewerService
      .getReviewerSpotlights()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture reviewers after API error', error);
          return of(TOP_REVIEWERS_FIXTURE);
        })
      )
      .subscribe(reviewers => this.topReviewersSubject.next(reviewers));
  }

  private loadGenres(): void {
    this.genreService
      .getGenres()
      .pipe(
        take(1),
        map(genres =>
          genres.map<GenreChip>((genre, index) =>
            typeof genre === 'string'
              ? {
                  id: `genre-${index}`,
                  label: genre,
                  accent: GENRES_FIXTURE[index]?.accent ?? '#6366f1'
                }
              : genre
          )
        ),
        catchError(error => {
          console.warn('Using fixture genres after API error', error);
          return of(GENRES_FIXTURE);
        })
      )
      .subscribe(genres => this.genresSubject.next(genres));
  }

  private loadDailyChallenge(): void {
    this.reviewService
      .getDailyChallenge()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture daily challenge after API error', error);
          return of(DAILY_CHALLENGE_FIXTURE);
        })
      )
      .subscribe(challenge => this.dailyChallengeSubject.next(challenge));
  }

  private loadUpcomingAlbums(): void {
    this.albumService
      .getUpcomingAlbums()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture upcoming albums after API error', error);
          return of(UPCOMING_ALBUMS_FIXTURE);
        })
      )
      .subscribe(albums => this.upcomingAlbumsSubject.next(albums));
  }
}
