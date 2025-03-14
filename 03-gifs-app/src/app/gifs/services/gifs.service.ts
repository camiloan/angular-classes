import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/git.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, type Observable, tap } from 'rxjs';


const GIF_KEY = 'gifs';
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '[]';

  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3))
    }
    return groups;
  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  constructor() {
    this.loadTrendingGifs()
  }


  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory())
    localStorage.setItem(GIF_KEY, historyString)
  })

  loadTrendingGifs() {

    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 10,
        offset: this.trendingPage() * 20

      }
    }).subscribe(response => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data)
      this.trendingGifs.update(currentGifs => [...gifs, ...currentGifs])
      this.trendingPage.update(page => page + 1)
      this.trendingGifsLoading.set(false)
    })
  }

  searchGifs(searchText: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: searchText,
        limit: 10,
      }
    }).pipe(map(({ data }) => data), map(items => GifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [searchText.toLocaleLowerCase()]: items
        }))
      })
    )
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? []
  }

}
