import { computed, inject, Injectable, signal } from '@angular/core';
import type { User, UserResponse, UsersResponse } from '../interfaces/req-response';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs';

interface State {
  users: User[]
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private http = inject(HttpClient)

  #state = signal<State>({
    loading: true,
    users: []
  })

  users = computed(() => this.#state().users)
  loading = computed(() => this.#state().loading)

  constructor() {
    this.http.get<UsersResponse>('https://reqres.in/api/users')
      .pipe(delay(1000))
      .subscribe(res => {
        this.#state.set({
          loading: false,
          users: res.data
        })
      })
  }

  getUserById(id: string) {
    return this.http.get<UserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(delay(1000), map(res => res.data))

  }
}
