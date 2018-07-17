import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IdentificationService } from '../core/services/identification.service';

@Component({
  selector: 'app-history-verification',
  templateUrl: './history-verification.component.html',
  styleUrls: ['./history-verification.component.scss']
})
export class HistoryVerificationComponent implements OnInit {
  private identifications = [
    {
      id: 1,
      user_id: 11,
      user_name: 'Ivan',
      user_surname: 'Petrov',
      deal_id: 7,
      date: '2018-07-12',
      result: 'pass'
    },
    {
      id: 2,
      user_id: 12,
      user_name: 'Sergey',
      user_surname: 'Sidorov',
      deal_id: 8,
      date: '2018-07-11',
      result: 'fail'
    },
    {
      id: 3,
      user_id: 9,
      user_name: 'Maxim',
      user_surname: 'Petuhov',
      deal_id: 2,
      date: '2018-07-11',
      result: 'waiting'
    }
  ];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'user_id', 'deal_id', 'date', 'result', 'details'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.identifications);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
