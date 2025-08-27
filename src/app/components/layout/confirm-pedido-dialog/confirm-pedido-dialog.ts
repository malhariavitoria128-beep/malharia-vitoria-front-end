import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-pedido-dialog',
  standalone: false,
  templateUrl: './confirm-pedido-dialog.html',
  styleUrl: './confirm-pedido-dialog.css'
})
export class ConfirmPedidoDialog {

  constructor(public dialogRef: MatDialogRef<ConfirmPedidoDialog>,  @Inject(MAT_DIALOG_DATA) public data: { userName: string }) {}

}
