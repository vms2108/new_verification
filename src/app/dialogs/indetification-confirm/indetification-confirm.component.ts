import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-indetification-confirm',
  templateUrl: 'indetification-confirm.component.html',
  styleUrls: ['indetification-confirm.component.scss']
})
export class IndetificationConfirmComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<IndetificationConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  @Language() lang: string;
  ngOnInit() {}

  confirm(value: boolean) {
    this.dialogRef.close(value);
  }
}
