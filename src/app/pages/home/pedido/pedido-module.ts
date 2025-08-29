import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from './pedido/pedido';
import { PedidoRoutingModule } from './pedido-routing.module';

import { CadastrarPedido } from './cadastrar-pedido/cadastrar-pedido';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ListarPedidos } from './listar-pedidos/listar-pedidos';


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
    NgxMaskDirective,
     MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,

  ],
  providers: [provideNgxMask({ /* opções de cfg */ })],
})
export class PedidoModule { }
