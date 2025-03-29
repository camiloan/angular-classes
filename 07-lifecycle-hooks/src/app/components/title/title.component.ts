import { ChangeDetectionStrategy, Component, input, type SimpleChanges, type OnChanges } from '@angular/core';
import { log } from '../../pages/home-page/home-page.component';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnChanges {

  title = input.required<string>();

  ngOnChanges(changes: SimpleChanges) {
    log('ngOnChanges', "Runs every time the component's inputs have changed.")

    for (const inputName in changes) {
      const inputValues = changes[inputName];
      console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
      console.log(`Current ${inputName} == ${inputValues.currentValue}`);
      console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
    }
  }

}
