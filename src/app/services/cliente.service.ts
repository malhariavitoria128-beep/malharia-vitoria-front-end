import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BuscarClientes, ClienteSalvar } from '../core/models/cliente/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  buscarClientes(): Observable<BuscarClientes[]> {
    return this.http.get<ClienteSalvar[]>(`${this.baseUrl}Cliente/all`);
  }

  register(request: ClienteSalvar): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}Cliente/register`, request);
  }

  getById(id: number): Observable<BuscarClientes> {
    return this.http.get<BuscarClientes>(`${this.baseUrl}Cliente/get-by-id/${id}`);
  }

  update(id: number, cliente: ClienteSalvar): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}Cliente/${id}`, cliente);
  }

  deletar(clienteId: string): Observable<{success: boolean, message: string, clienteId: number}> {
    return this.http.delete<{success: boolean, message: string, clienteId: number}>(`${this.baseUrl}Cliente/${clienteId}`,{});
  }

}
