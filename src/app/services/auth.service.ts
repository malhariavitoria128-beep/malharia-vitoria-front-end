import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { JwtPayload, RegisterResquest, LoginResquest, LoginResponse, UsuarioAutenticado, NewPassword } from '../core/models/login/login.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environments';
import { ChangePassword } from '../auth/change-password/change-password';
import { ApiResponse } from '../core/models/api-response';

const TOKEN_KEY = 'app_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioSubject = new BehaviorSubject<UsuarioAutenticado | null>(null);
  usuario$ = this.usuarioSubject.asObservable();
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  initialize(): void {
  const token = this.getToken();
  if (!token) {
    this.usuarioSubject.next(null);
    return;
  }

  try {
    this.setUsuarioFromToken(token);
  } catch (error) {
    // Token inválido, remove e zera o usuário
    localStorage.removeItem(TOKEN_KEY);
    this.usuarioSubject.next(null);
  }
}

  login(request: LoginResquest): Observable<UsuarioAutenticado> {
    return this.http.post<LoginResponse>(`${this.baseUrl}Auth/login`, request).pipe(
      tap(res => {
        this.setToken(res.token);
        this.setUsuarioFromToken(res.token);
      }),
      map(() => this.usuarioSubject.value!),
      catchError(err => throwError(() => err))
    );
  }

  register(request: RegisterResquest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}Auth/register`, request);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.usuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private setUsuarioFromToken(token: string): void {
    const payload = jwtDecode<JwtPayload>(token);

    const usuario: UsuarioAutenticado = {
      id: payload.sub,
      email: payload.email,
      roles: Array.isArray(payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
        ? payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        : [payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']],
      isApproved: payload.is_approved === 'true'
    };

    this.usuarioSubject.next(usuario);
  }

  hasRole(role: string): boolean {
    const usuario = this.usuarioSubject.value;
    return !!usuario?.roles.includes(role);
  }

  isUserApproved(): boolean {
    return !!this.usuarioSubject.value?.isApproved;
  }

  changePassword(request: NewPassword): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}Auth/password`, request);
  }

}
