import { HeavyLoadersSlowComponent } from '@/dashboard/shared/heavy-loaders/heavy-loaders-slow.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from "../../shared/title/title.component";

@Component({
  selector: 'app-defer-views',
  imports: [HeavyLoadersSlowComponent, TitleComponent],
  templateUrl: './defer-views.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeferViewsComponent { }
