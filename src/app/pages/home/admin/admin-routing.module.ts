import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarUsuarios } from './listar-usuarios/listar-usuarios';
import { Admin } from './admin';

const routes: Routes = [
  {
    path: '',
    component: Admin, // Pai
    children: [
      { path: '', redirectTo: 'listar-usuarios', pathMatch: 'full' }, // Redireciona automático
      { path: 'listar-usuarios', component: ListarUsuarios }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
