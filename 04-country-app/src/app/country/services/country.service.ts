import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import type { Country } from '../interfaces/country.interface';
import type { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();


  searchByCapital(query: string) {
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query.toLowerCase()}`).pipe(map((restCountries) =>
      CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
    ),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError((error) => {
        console.log('Error fetching countries', error);
        return throwError(() => new Error(`No se encontró un país con esa consulta ${query}`));
      })
    );
  }


  searchByCountry(query: string) {

    const url = `${API_URL}/name/${query.toLowerCase()}`;

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []).pipe(delay(2000));
    }

    return this.http.get<RESTCountry[]>(url).pipe(map((restCountries) =>
      CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
    ),
      tap((countries) => this.queryCacheCountry.set(query, countries)), delay(2000),
      catchError((error) => {
        console.log('Error fetching countries', error);
        return throwError(() => new Error(`No se encontró un país con esa consulta ${query}`));
      }));
  }

  searchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []).pipe(delay(2000));
    }

    return this.http.get<RESTCountry[]>(url).pipe(map((restCountries) =>
      CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
    ),
      tap((countries) => this.queryCacheRegion.set(region, countries)), delay(2000),
      catchError((error) => {
        console.log('Error fetching countries', error);
        return throwError(() => new Error(`No se encontró un país con esa consulta ${region}`));
      }));
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;
    return this.http.get<RESTCountry[]>(url).pipe(map((restCountries) =>
      CountryMapper.mapRestCountryArrayToCountryArray(restCountries)

    ), map((countries) => countries.at(0)), delay(2000),
      catchError((error) => {
        console.log('Error fetching countries', error);
        return throwError(() => new Error(`No se encontró un país con esa código ${code}`));
      }));
  }

}
