import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from './pedido/pedido';
import { PedidoRoutingModule } from './pedido-routing.module';
import { ListarPedidos } from './listar-pedidos/listar-pedidos';
import { CadastrarPedido } from './cadastrar-pedido/cadastrar-pedido';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    Pedido,
    ListarPedidos,
    CadastrarPedido
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask({ /* opções de cfg */ })],
})
export class PedidoModule { }
