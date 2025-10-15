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
  TRIDIFY_DISCOVERY_FIXTURES,
  TRIDIFY_DISCOVERY_SEARCH_FIXTURE
} from './tridify-discovery.fixtures';
import { TridifyDiscoveryApiService } from './tridify-discovery.api';

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

  readonly userProfile$ = this.userProfileSubject.asObservable();
  readonly topReviews$ = this.topReviewsSubject.asObservable();
  readonly topReviewers$ = this.topReviewersSubject.asObservable();
  readonly genres$ = this.genresSubject.asObservable();
  readonly dailyChallenge$ = this.dailyChallengeSubject.asObservable();
  readonly upcomingAlbums$ = this.upcomingAlbumsSubject.asObservable();
  readonly searchResults$ = this.searchResultsSubject.asObservable();

  constructor(private readonly api: TridifyDiscoveryApiService) {}

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

    this.api
      .searchDiscoveries({ term: sanitized })
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
    this.api
      .getUserProfile()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture user profile after API error', error);
          return of(TRIDIFY_DISCOVERY_FIXTURES.userProfile);
        })
      )
      .subscribe(profile => this.userProfileSubject.next(profile));
  }

  private loadTopReviews(): void {
    this.api
      .getTopReviewsForToday()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture reviews after API error', error);
          return of(TRIDIFY_DISCOVERY_FIXTURES.topReviews);
        })
      )
      .subscribe(reviews => this.topReviewsSubject.next(reviews));
  }

  private loadReviewerSpotlights(): void {
    this.api
      .getReviewerSpotlights()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture reviewers after API error', error);
          return of(TRIDIFY_DISCOVERY_FIXTURES.topReviewers);
        })
      )
      .subscribe(reviewers => this.topReviewersSubject.next(reviewers));
  }

  private loadGenres(): void {
    this.api
      .getGenres()
      .pipe(
        take(1),
        map(genres =>
          genres.map<GenreChip>((genre, index) =>
            typeof genre === 'string'
              ? {
                  id: `genre-${index}`,
                  label: genre,
                  accent: TRIDIFY_DISCOVERY_FIXTURES.genres[index]?.accent ?? '#6366f1'
                }
              : genre
          )
        ),
        catchError(error => {
          console.warn('Using fixture genres after API error', error);
          return of(TRIDIFY_DISCOVERY_FIXTURES.genres);
        })
      )
      .subscribe(genres => this.genresSubject.next(genres));
  }

  private loadDailyChallenge(): void {
    this.api
      .getDailyChallenge()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture daily challenge after API error', error);
          return of(TRIDIFY_DISCOVERY_FIXTURES.dailyChallenge);
        })
      )
      .subscribe(challenge => this.dailyChallengeSubject.next(challenge));
  }

  private loadUpcomingAlbums(): void {
    this.api
      .getUpcomingAlbums()
      .pipe(
        take(1),
        catchError(error => {
          console.warn('Using fixture upcoming albums after API error', error);
          return of(TRIDIFY_DISCOVERY_FIXTURES.upcomingAlbums);
        })
      )
      .subscribe(albums => this.upcomingAlbumsSubject.next(albums));
  }
}
