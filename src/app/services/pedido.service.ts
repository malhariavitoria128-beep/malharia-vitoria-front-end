import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
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

  getPedidoPorNumero(numeroPedido: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}Pedido/${numeroPedido}`);
  }

  adicionarItens(pedidoId: number, itens: ItemPedido[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/${pedidoId}/adicionar-itens`, itens);
  }

}
