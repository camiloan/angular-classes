import { UsersService } from '@/dashboard/services/users.service';
import { TitleComponent } from '@/dashboard/shared/title/title.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [TitleComponent, RouterLink],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {

  public usersService = inject(UsersService)


}
