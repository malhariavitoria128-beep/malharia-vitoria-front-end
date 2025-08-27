import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemPedido, Pedido } from '../core/models/pedido/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  criarPedido(clienteId: number): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}Pedido`, { clienteId, itens: [] });
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}Pedido/${id}`);
  }

  adicionarItens(pedidoId: number, itens: ItemPedido): Observable<any> {
    return this.http.put(`${this.baseUrl}Pedido/${pedidoId}/adicionar-item`, itens);
  }

atualizarDataEntrega(pedidoId: number, dataEntrega: string): Observable<any> {
  const isoDate = new Date(dataEntrega).toISOString();
    return this.http.put(`${this.baseUrl}Pedido/${pedidoId}/data-entrega`,
      `"${isoDate}"`,  
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

}
