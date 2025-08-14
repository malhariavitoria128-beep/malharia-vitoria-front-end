import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pedido } from './pedido/pedido';
import { ListarPedidos } from './listar-pedidos/listar-pedidos';

const routes: Routes = [
  {
    path: '',
    component: Pedido, // Pai
    children: [
      { path: '', redirectTo: 'listar-pedidos', pathMatch: 'full' }, // Redireciona automático
      { path: 'listar-pedidos', component: ListarPedidos }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
