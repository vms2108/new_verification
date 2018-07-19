import { VerificationService } from '../core/services/verification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-history-verification',
  templateUrl: './history-verification.component.html',
  styleUrls: ['./history-verification.component.scss']
})
export class HistoryVerificationComponent implements OnInit {
  private verifications = [];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'user_id', 'deal_id', 'date', 'result', 'details'];
  @Language() lang: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private verificationService: VerificationService) {
    this.verifications = this.verificationService.generateHistoryTable();
    this.dataSource = new MatTableDataSource(this.verifications);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
