import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { BaseApiService } from '../../../core/services/base-api.service';
import { ReviewerSpotlight } from '../../models/discovery.models';

@Injectable({
  providedIn: 'root'
})
export class TridifyReviewerService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getReviewerSpotlights(): Observable<ReviewerSpotlight[]> {
    return this.get<ReviewerSpotlight[]>(API_ENDPOINTS.TRIDIFY.REVIEWER_SPOTLIGHT);
  }
}
