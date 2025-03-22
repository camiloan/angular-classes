import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  routes = routes.map(route => ({
    title: route.title ?? '',
    path: route.path ?? ''
  }));

}
