import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    nav {
      display: flex;
      gap:1rem;
      align-items: center;
      justify-content: center;
    }
    .active {
      color: #341162;
      font-weight: bold;
    }
    `]
})
export class NavbarComponent { }
