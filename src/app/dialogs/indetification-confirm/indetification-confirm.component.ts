import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-indetification-confirm',
  templateUrl: 'indetification-confirm.component.html',
  styleUrls: ['indetification-confirm.component.scss']
})
export class IndetificationConfirmComponent {
  constructor(
    private dialogRef: MatDialogRef<IndetificationConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm(value: boolean) {
    this.dialogRef.close(value);
  }
}
