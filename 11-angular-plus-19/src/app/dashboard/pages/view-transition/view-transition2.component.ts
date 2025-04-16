import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from "../../shared/title/title.component";

@Component({
  selector: 'app-view-transition',
  imports: [TitleComponent],
  template: `
    <app-title title="View Transition 2"></app-title>
    <section class="flex justify-end">
      <img
      srcset="https://picsum.photos/id/237/200/300"
      alt="Picsum"
      width="200"
      height="300"
      style="view-transition-name: hero2"
      >
      <div class="fixed bottom-16 right-10 bg-primary brightness-50 w-32 h-32 rounded" style="view-transition-name: hero1"
      >
      </div>

    </section>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViewTransitionComponent { }
