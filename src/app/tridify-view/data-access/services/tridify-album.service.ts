import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { BaseApiService } from '../../../core/services/base-api.service';
import { SearchResultItem, TridifySearchPayload, UpcomingAlbum } from '../../models/discovery.models';

@Injectable({
  providedIn: 'root'
})
export class TridifyAlbumService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getUpcomingAlbums(): Observable<UpcomingAlbum[]> {
    return this.get<UpcomingAlbum[]>(API_ENDPOINTS.TRIDIFY.UPCOMING_ALBUMS);
  }

  searchAlbums(payload: TridifySearchPayload): Observable<SearchResultItem[]> {
    return this.post<SearchResultItem[]>(API_ENDPOINTS.TRIDIFY.SEARCH, payload);
  }
}
