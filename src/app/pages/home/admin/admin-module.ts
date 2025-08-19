import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin } from './admin';
import { AdminRoutingModule } from './admin-routing.module';
import { ListarUsuarios } from './listar-usuarios/listar-usuarios';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegistrarUsuario } from './registrar-usuario/registrar-usuario';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    Admin,
    ListarUsuarios,
    RegistrarUsuario
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ]
})
export class AdminModule { }
