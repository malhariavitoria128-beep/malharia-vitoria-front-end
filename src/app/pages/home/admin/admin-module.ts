import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin } from './admin';
import { AdminRoutingModule } from './admin-routing.module';
import { ListarUsuarios } from './listar-usuarios/listar-usuarios';



@NgModule({
  declarations: [
    Admin,
    ListarUsuarios
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
