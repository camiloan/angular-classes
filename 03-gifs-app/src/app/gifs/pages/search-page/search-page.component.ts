import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import type { Gif } from '../../interfaces/git.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifs = signal<Gif[]>([]);

  gifService = inject(GifService);

  onSearch(searchText: string) {
    this.gifService.searchGifs(searchText).subscribe(response => {
      this.gifs.set(response)
    })
  }
}
