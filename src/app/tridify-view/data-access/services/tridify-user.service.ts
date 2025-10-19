import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { BaseApiService } from '../../../core/services/base-api.service';
import { TridifyUserProfile } from '../../models/discovery.models';

@Injectable({
  providedIn: 'root'
})
export class TridifyUserService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getUserProfile(): Observable<TridifyUserProfile> {
    return this.get<TridifyUserProfile>(API_ENDPOINTS.TRIDIFY.USER_PROFILE);
  }
}
