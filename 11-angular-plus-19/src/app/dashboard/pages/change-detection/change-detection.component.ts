import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from "../../shared/title/title.component";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-change-detection',
  imports: [TitleComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush, // Zone Less
  // changeDetection: ChangeDetectionStrategy.Default, // Zone Full
  template: `
   <app-title [title]="currentFramework()"></app-title>
   <pre> {{ frameworkAsSignal() | json }}</pre>
   <pre> Hola {{ frameworkAsProperty | json }}</pre>
  `,
})
export default class ChangeDetectionComponent {

  currentFramework = computed(() =>
    `Change detection: ${this.frameworkAsSignal().name}`)

  frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  })

  frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016
  }

  constructor() {
    setInterval(() => {
/*       this.frameworkAsProperty.name = 'React'
 */      this.frameworkAsSignal.update(value => ({
        ...value,
        name: 'React'
      }))
      console.log('Contructor')
    }, 3000)
  }

}
