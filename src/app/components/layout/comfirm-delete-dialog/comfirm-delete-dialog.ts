import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comfirm-delete-dialog',
  standalone: false,
  templateUrl: './comfirm-delete-dialog.html',
  styleUrl: './comfirm-delete-dialog.css'
})
export class ComfirmDeleteDialog {
    constructor(
    public dialogRef: MatDialogRef<ComfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { userName: string }
  ) {}
}
