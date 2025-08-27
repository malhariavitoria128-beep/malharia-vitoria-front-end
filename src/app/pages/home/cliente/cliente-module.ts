import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from './cliente';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ListarClientes } from './listar-clientes/listar-clientes';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { CadastrarCliente } from './cadastrar-cliente/cadastrar-cliente';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AlterarCliente } from './alterar-cliente/alterar-cliente';


@NgModule({
  declarations: [
    Cliente,
    ListarClientes,
    CadastrarCliente,
    AlterarCliente
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    NgxMaskDirective
  ],
providers: [provideNgxMask({ /* opções de cfg */ })],
})
export class ClienteModule { }
