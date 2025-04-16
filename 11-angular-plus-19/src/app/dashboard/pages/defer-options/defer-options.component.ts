import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from "../../shared/title/title.component";
import { HeavyLoadersFastComponent } from "../../shared/heavy-loaders/heavy-loaders-fast.component";

@Component({
  selector: 'app-defer-options',
  imports: [TitleComponent, HeavyLoadersFastComponent],
  templateUrl: './defer-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeferOptionsComponent { }
