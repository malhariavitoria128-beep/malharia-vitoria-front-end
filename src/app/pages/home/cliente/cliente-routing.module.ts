import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cliente } from './cliente';
import { ListarClientes } from './listar-clientes/listar-clientes';
import { CadastrarCliente } from './cadastrar-cliente/cadastrar-cliente';
import { AlterarCliente } from './alterar-cliente/alterar-cliente';

const routes: Routes = [
  {
    path: '',
    component: Cliente,
    children: [
      { path: '', redirectTo: 'listar-clientes', pathMatch: 'full' },
      { path: 'listar-clientes', component: ListarClientes },
      { path: 'cadastrar-cliente', component: CadastrarCliente },
      { path: 'alterar-cliente/:id', component: AlterarCliente }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
