import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  fb = inject(FormBuilder)
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions)
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })


  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged()
    const countrySubscription = this.onCountryChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe()
      countrySubscription.unsubscribe()
    }
    )
  })

  onRegionChanged() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return this.myForm.get('region')!.valueChanges.pipe(tap(() => this.myForm.get('country')!.setValue('')),
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }), switchMap((region) => this.countryService.getCountriesByRegion(region ?? '')))
      .subscribe(countries => {
        this.countriesByRegion.set(countries)
      })
  }

  onCountryChanged() {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return this.myForm.get('country')!.valueChanges.pipe(
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      tap(() => this.myForm.get('border')!.setValue('')),
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      filter((value) => value!.length > 0),
      switchMap((alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
      switchMap((country) => {
        console.log('country', country)
        return this.countryService.getCountryNamesByCodeArray(country.borders)
      }
      )
    ).subscribe(borders => {
      console.log('borders', borders)
      this.borders.set(borders)
    })
  }
}
