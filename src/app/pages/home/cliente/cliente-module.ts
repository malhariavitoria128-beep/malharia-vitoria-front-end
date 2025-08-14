import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from './cliente';
import { ClienteRoutingModule } from './cliente-routing.module';



@NgModule({
  declarations: [
    Cliente
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
