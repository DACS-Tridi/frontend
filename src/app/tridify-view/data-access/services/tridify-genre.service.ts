import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { BaseApiService } from '../../../core/services/base-api.service';
import { GenreChip } from '../../models/discovery.models';

@Injectable({
  providedIn: 'root'
})
export class TridifyGenreService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getGenres(): Observable<GenreChip[]> {
    return this.get<GenreChip[]>(API_ENDPOINTS.TRIDIFY.GENRES);
  }
}
