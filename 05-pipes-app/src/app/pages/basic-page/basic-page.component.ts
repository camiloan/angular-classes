import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { type AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPageComponent {
  localeService = inject(LocaleService)
  currentLocale = signal(inject(LOCALE_ID))
  nameLower = signal('camilo')
  nameUpper = signal('Camilo')
  fullName = signal('cAmIlO BoLaÑoS')
  customDate = signal(new Date())


  tickingDateEffect = effect((onCleanup) => {
    const intervaL = setInterval(() => {
      this.customDate.set(new Date())
    }, 1000);
    onCleanup(() => {
      clearInterval(intervaL);
    });
  })

  changeLocale(locale: AvailableLocale) {
    this.localeService.changeLocale(locale)
  }


}
