import type { User } from '@/dashboard/interfaces/req-response';
import { TitleComponent } from '@/dashboard/shared/title/title.component';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsersService } from '@/dashboard/services/users.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [TitleComponent],
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {


  private route = inject(ActivatedRoute)
  private usersService = inject(UsersService)

  public user = toSignal(this.route.params.pipe(switchMap(({ id }) => this.usersService.getUserById(id))))

  titleLabel = computed(() => {
    if (this.user()) {
      return `Información del usuario ${this.user()?.first_name} ${this.user()?.last_name}`
    }
    return 'Información del usuario'

  })



  constructor() {
    console.log(this.route.snapshot.params)
  }

}
