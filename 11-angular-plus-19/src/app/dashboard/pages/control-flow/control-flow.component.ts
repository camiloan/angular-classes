import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TitleComponent } from "../../shared/title/title.component";

type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

@Component({
  selector: 'app-control-flow',
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ControlFlowComponent {
  showContent = signal(false)
  grade = signal<Grade>('A')
  public frameworks = signal<string[]>(['Angular', 'React', 'Vue', 'Svelte', 'Preact'])
  public frameworks2 = signal<string[]>([])

  toggleContent() {
    this.showContent.update(value => !value)
  }

}
