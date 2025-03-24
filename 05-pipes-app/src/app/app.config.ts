import { type ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

import localEs from '@angular/common/locales/es';
import localFr from '@angular/common/locales/fr';
import localEn from '@angular/common/locales/en';
import { LocaleService } from './services/locale.service';

registerLocaleData(localEs, 'es');
registerLocaleData(localFr, 'fr');
registerLocaleData(localEn, 'en');

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  {
    provide: LOCALE_ID,
    deps: [LocaleService],
    useFactory: (localesService: LocaleService) => localesService.getLocale,
  }
  ]
};
