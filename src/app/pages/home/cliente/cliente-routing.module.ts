import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cliente } from './cliente';
import { ListarClientes } from './listar-clientes/listar-clientes';

const routes: Routes = [
  {
    path: '',
    component: Cliente,
    children: [
      { path: '', redirectTo: 'listar-clientes', pathMatch: 'full' }, 
      { path: 'listar-clientes', component: ListarClientes }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
