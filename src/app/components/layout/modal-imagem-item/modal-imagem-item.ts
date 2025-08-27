import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-imagem-item',
  standalone: false,
  templateUrl: './modal-imagem-item.html',
  styleUrl: './modal-imagem-item.css'
})
export class ModalImagemItem {

   constructor(
    public dialogRef: MatDialogRef<ModalImagemItem>,
    @Inject(MAT_DIALOG_DATA) public data: { imagem: string }
  ) {}

   fechar(): void {
    this.dialogRef.close();
  }

}
