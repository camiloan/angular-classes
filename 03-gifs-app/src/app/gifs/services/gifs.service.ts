import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  constructor() {
    this.loadTrendingGifs()
  }

  loadTrendingGifs() {

    this.http.get<GiphyResponse>(`${environment.giphyApiKey}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 10,

      }
    })
  }

}
