import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { RouterModule } from '@angular/router';
import { ComfirmDeleteDialog } from './comfirm-delete-dialog/comfirm-delete-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmPedidoDialog } from './confirm-pedido-dialog/confirm-pedido-dialog';

@NgModule({
  declarations: [
    Navbar,
    ComfirmDeleteDialog,
    ConfirmPedidoDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ],
    exports: [
    Navbar,
    ComfirmDeleteDialog,
    ConfirmPedidoDialog
  ]
})
export class LayoutModule { }
