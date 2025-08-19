import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../core/models/usuario/usuario.model';
import { Observable } from 'rxjs';
import { RegisterAdminResquest } from '../core/models/login/login.model';
import { ApiResponse } from '../core/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  buscarUsuariosPendentes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}Admin/pending`);
  }

  buscarTodosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}Admin/all`);
  }

  buscarUsuariosAprovados(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}Admin/approved`);
  }

  register(request: RegisterAdminResquest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}Admin/register-by-admin`, request);
  }

  autorizarUsuario(userId: string): Observable<{success: boolean, message: string, userId: number}> {
    return this.http.post<{success: boolean, message: string, userId: number}>(`${this.baseUrl}Admin/approve/${userId}`, {});
  }

  deletarUsuario(userId: string): Observable<{success: boolean, message: string, userId: number}> {
    return this.http.delete<{success: boolean, message: string, userId: number}>(`${this.baseUrl}Admin/${userId}`,{});
  }

  changeRole(novaRole: string, userId: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('role', novaRole)
      .set('id', userId.toString());

    return this.http.put<ApiResponse>(`${this.baseUrl}Admin/change-role`, null, { params });
  }

}
