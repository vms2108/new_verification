import { Component, OnInit, Inject } from '@angular/core';
import { Language } from 'angular-l10n';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-confirm',
  templateUrl: 'request-confirm.component.html',
  styleUrls: ['request-confirm.component.scss']
})
export class RequestConfirmComponent implements OnInit {
  @Language()
  lang: string;

  constructor(private dialogRef: MatDialogRef<RequestConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  confirm(value: boolean) {
    this.dialogRef.close(value);
  }
}
