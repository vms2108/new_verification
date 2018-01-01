import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-table-details',
  templateUrl: 'table-details.component.html',
  styleUrls: ['table-details.component.scss']
})
export class TableDetailsComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<TableDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  @Language() lang: string;

  public identification = false;
  public verification = false;

  public id = null;

  ngOnInit() {
    this.identification = this.data.mode === 'identification';
    this.verification = this.data.mode === 'verification';
    this.id = this.data.id;
  }

  confirm(value: boolean) {
    this.dialogRef.close(value);
  }
}
