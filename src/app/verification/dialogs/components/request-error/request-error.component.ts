import { Component, OnInit, Inject } from '@angular/core';
import { Language } from 'angular-l10n';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-error',
  templateUrl: 'request-error.component.html',
  styleUrls: ['request-error.component.scss']
})
export class RequestErrorComponent implements OnInit {
  @Language()
  lang: string;

  constructor(private dialogRef: MatDialogRef<RequestErrorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}
