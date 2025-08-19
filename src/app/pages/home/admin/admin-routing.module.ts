import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuarios } from './listar-usuarios/listar-usuarios';
import { Admin } from './admin';
import { RegistrarUsuario } from './registrar-usuario/registrar-usuario';

const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: '', redirectTo: 'listar-usuarios/pendentes', pathMatch: 'full' },
      { path: 'listar-usuarios/:filtro', component: ListarUsuarios },
      { path: 'registrar-usuario', component: RegistrarUsuario }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
