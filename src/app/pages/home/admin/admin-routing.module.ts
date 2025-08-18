import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarUsuarios } from './listar-usuarios/listar-usuarios';
import { Admin } from './admin';
import { RegistrarUsuario } from './registrar-usuario/registrar-usuario';
import { AlterarUsuario } from './alterar-usuario/alterar-usuario';

const routes: Routes = [
  {
    path: '',
    component: Admin, // Pai
    children: [
      { path: '', redirectTo: 'listar-usuarios/pendentes', pathMatch: 'full' }, // Redireciona automático para pendentes
      { path: 'listar-usuarios/:filtro', component: ListarUsuarios },
      { path: 'registrar-usuario', component: RegistrarUsuario },
      { path: 'alterar-usuario/:id', component: AlterarUsuario }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
