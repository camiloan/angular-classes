import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, map, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);



  searchByCapital(query: string) {

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query.toLowerCase()}`).pipe(map((restCountries) =>
      CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
    ),
      catchError((error) => {
        console.log('Error fetching countries', error);
        return throwError(() => new Error(`No se encontró un país con esa consulta ${query}`));
      })
    );
  }


  searchByCountry(query: string) {
    const url = `${API_URL}/name/${query.toLowerCase()}`;
    return this.http.get<RESTCountry[]>(url).pipe(map((restCountries) =>
      CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
    ),
      catchError((error) => {
        console.log('Error fetching countries', error);
        return throwError(() => new Error(`No se encontró un país con esa consulta ${query}`));
      }));
  }

}
