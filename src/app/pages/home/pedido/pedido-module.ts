import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from './pedido/pedido';
import { PedidoRoutingModule } from './pedido-routing.module';
import { ListarPedidos } from './listar-pedidos/listar-pedidos';



@NgModule({
  declarations: [
    Pedido,
    ListarPedidos
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule
  ]
})
export class PedidoModule { }
