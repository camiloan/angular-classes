import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import type { AuthResponse } from '@auth/interfaces/auth-response.interface';
import type { User } from '@products/interfaces/product.interface';
import { catchError, map, type Observable, tap, of } from 'rxjs';
import { environment } from 'src/environments/environment';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User | null>(null)
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  })

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking'
    }
    if (this._user()) {
      return 'authenticated'
    }
    return 'not-authenticated'

  })

  user = computed(() => this._user())
  token = computed(() => this._token())
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false)

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, { email, password }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error) => this.handleAuthError(error))
    )
  }


  checkStatus(): Observable<boolean> {
    //TODO: Para evitar bombardear el servidor, se sugiere cacheear el resultado de esta llamada cada cierto tiempo 1h por ejemplo
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }
    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`
    ).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error) => this.handleAuthError(error))
    )
  }

  register(fullName: string, email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, { fullName, email, password }).pipe(
      map(resp => this.handleAuthSuccess(resp)),
      catchError((error) => this.handleAuthError(error))
    )
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);
    return true;

  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
