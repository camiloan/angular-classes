import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interface";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(', '),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population: restCountry.population,
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
