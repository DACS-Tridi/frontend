import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { BaseApiService } from '../../../core/services/base-api.service';
import { DailyChallenge, ReviewHighlight } from '../../models/discovery.models';
import { ReviewCreatePayload } from '../../models/review-create.models';

@Injectable({
  providedIn: 'root'
})
export class TridifyReviewService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getAllReviews(): Observable<ReviewHighlight[]> {
    return this.get<ReviewHighlight[]>(API_ENDPOINTS.TRIDIFY.ALL_REVIEWS);
  }

  getTopReviewsForToday(): Observable<ReviewHighlight[]> {
    return this.get<ReviewHighlight[]>(API_ENDPOINTS.TRIDIFY.TODAY_REVIEWS);
  }

  getDailyChallenge(): Observable<DailyChallenge> {
    return this.get<DailyChallenge>(API_ENDPOINTS.TRIDIFY.DAILY_CHALLENGE);
  }

  getMyReviews(): Observable<ReviewHighlight[]> {
    return this.get<ReviewHighlight[]>(API_ENDPOINTS.TRIDIFY.MY_REVIEWS);
  }

  createReview(payload: ReviewCreatePayload): Observable<ReviewHighlight> {
    return this.post<ReviewHighlight>(API_ENDPOINTS.TRIDIFY.CREATE_REVIEW, payload);
  }
}
