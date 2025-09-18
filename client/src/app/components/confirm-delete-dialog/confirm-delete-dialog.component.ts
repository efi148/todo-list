import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDeleteData } from "@interfaces";

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatIconModule],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialogComponent>);
  readonly data = inject<ConfirmDeleteData>(MAT_DIALOG_DATA);


  onCancel() { this.dialogRef.close('cancel'); }
  onConfirm() { this.dialogRef.close('confirm'); }
}