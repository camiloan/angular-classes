import { booleanAttribute, ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: `<h1 class="text-3xl mb-5">{{title}}</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  @Input({ required: true }) title!: string;
  @Input({ transform: booleanAttribute }) withShadow = false;
}
