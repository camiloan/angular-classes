import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import {  of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export default class ByCapitalPageComponent {

  countryService = inject(CountryService);

  query = signal('');


  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCapital(request.query);
    },
  });

  /*   countryResource = resource({
      request: () => ({ query: this.query() }),
      loader: async ({ request }) => {
        if (!request.query) return [];
        return await firstValueFrom(this.countryService.searchByCapital(request.query));
      },
    }) */

  /*  isLoading = signal(false);
   isError = signal<string | null>(null)
   countries = signal<Country[]>([]);


   onSearch(query: string) {
     if (this.isLoading()) return;
     this.isLoading.set(true);
     this.isError.set(null);
     this.countryService.searchByCapital(query).subscribe({
       next: (countries) => {

         this.isLoading.set(false);
         this.countries.set(countries);

       },
       error: (error) => {
         this.isLoading.set(false);
         this.countries.set([]);
         this.isError.set(error);
       }
     })
   } */
}
