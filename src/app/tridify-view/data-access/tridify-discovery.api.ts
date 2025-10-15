import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { BaseApiService } from '../../core/services/base-api.service';
import {
  DailyChallenge,
  GenreChip,
  ReviewHighlight,
  ReviewerSpotlight,
  SearchResultItem,
  TridifySearchPayload,
  TridifyUserProfile,
  UpcomingAlbum
} from '../models/discovery.models';

@Injectable({
  providedIn: 'root'
})
export class TridifyDiscoveryApiService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getUserProfile(): Observable<TridifyUserProfile> {
    return this.get<TridifyUserProfile>(API_ENDPOINTS.TRIDIFY.USER_PROFILE);
  }

  getTopReviewsForToday(): Observable<ReviewHighlight[]> {
    return this.get<ReviewHighlight[]>(API_ENDPOINTS.TRIDIFY.TODAY_REVIEWS);
  }

  getReviewerSpotlights(): Observable<ReviewerSpotlight[]> {
    return this.get<ReviewerSpotlight[]>(API_ENDPOINTS.TRIDIFY.REVIEWER_SPOTLIGHT);
  }

  getGenres(): Observable<GenreChip[]> {
    return this.get<GenreChip[]>(API_ENDPOINTS.TRIDIFY.GENRES);
  }

  getDailyChallenge(): Observable<DailyChallenge> {
    return this.get<DailyChallenge>(API_ENDPOINTS.TRIDIFY.DAILY_CHALLENGE);
  }

  getUpcomingAlbums(): Observable<UpcomingAlbum[]> {
    return this.get<UpcomingAlbum[]>(API_ENDPOINTS.TRIDIFY.UPCOMING_ALBUMS);
  }

  searchDiscoveries(payload: TridifySearchPayload): Observable<SearchResultItem[]> {
    return this.post<SearchResultItem[]>(API_ENDPOINTS.TRIDIFY.SEARCH, payload);
  }
}
