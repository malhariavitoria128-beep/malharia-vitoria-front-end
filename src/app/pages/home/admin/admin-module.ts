import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin } from './admin';
import { AdminRoutingModule } from './admin-routing.module';
import { ListarUsuarios } from './listar-usuarios/listar-usuarios';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    Admin,
    ListarUsuarios,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
