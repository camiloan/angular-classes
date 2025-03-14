import type { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import ByCapitalPageComponent from './pages/by-capital-page/by-capital-page.component';
import { ByCountryComponent } from './pages/by-country/by-country.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const routes: Routes = [


  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        component: ByCountryComponent
      },
      {
        path: 'by-region',
        component: ByRegionComponent
      },
      {
        path: 'by/:country',
        component: CountryPageComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      }
    ]
  },

];


export default routes;
