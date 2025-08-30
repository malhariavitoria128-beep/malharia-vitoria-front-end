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
import { ModalImagemItem } from './modal-imagem-item/modal-imagem-item';
import { ModalAtualizarStatusItem } from './modal-atualizar-status-item/modal-atualizar-status-item';

@NgModule({
  declarations: [
    Navbar,
    ComfirmDeleteDialog,
    ConfirmPedidoDialog,
    ModalImagemItem,
    ModalAtualizarStatusItem
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
