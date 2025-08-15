import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../core/models/usuario/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

    buscarUsuariosPendentes(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.baseUrl}Admin/pending`);
    }

autorizarUsuario(userId: string): Observable<{success: boolean, message: string, userId: number}> {
  return this.http.post<{success: boolean, message: string, userId: number}>(
    `${this.baseUrl}Admin/approve/${userId}`,
    {}
  );
}

deletarUsuario(userId: string): Observable<{success: boolean, message: string, userId: number}> {
  return this.http.delete<{success: boolean, message: string, userId: number}>(
    `${this.baseUrl}Admin/${userId}`,
    {}
  );
}

}
