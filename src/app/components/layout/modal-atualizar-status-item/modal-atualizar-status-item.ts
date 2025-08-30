import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-atualizar-status-item',
  standalone: false,
  templateUrl: './modal-atualizar-status-item.html',
  styleUrl: './modal-atualizar-status-item.css'
})
export class ModalAtualizarStatusItem {
    constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalAtualizarStatusItem>
  ) {}

  selecionar(status: string) {
    this.dialogRef.close(status);
  }

}
