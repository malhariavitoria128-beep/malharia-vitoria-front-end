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
import { AlterarUsuario } from './alterar-usuario/alterar-usuario';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    Admin,
    ListarUsuarios,
    RegistrarUsuario,
    AlterarUsuario
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
     NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    MatMenuModule
  ]
})
export class AdminModule { }
