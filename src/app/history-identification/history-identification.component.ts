import { IdentificationService } from './../core/services/identification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-history-identification',
  templateUrl: './history-identification.component.html',
  styleUrls: ['./history-identification.component.css']
})
export class HistoryIdentificationComponent implements OnInit {
  private identifications = [
    {
      id: 1,
      user_id: 11,
      user_name: 'Ivan',
      user_surname: 'Petrov',
      reason: 2,
      date: '2018-07-12',
      result: 'pass'
    },
    {
      id: 2,
      user_id: 12,
      user_name: 'Sergey',
      user_surname: 'Sidorov',
      reason: 3,
      date: '2018-07-11',
      result: 'fail'
    },
    {
      id: 3,
      user_id: 13,
      user_name: 'Maxim',
      user_surname: 'Petuhov',
      reason: 2,
      date: '2018-07-11',
      result: 'waiting'
    }
  ];
  private identificationsNew = [];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'user_id', 'reason', 'date', 'result', 'details'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private identificationService: IdentificationService) {
    this.identificationsNew = this.identificationService.generateHistoryTable();
    this.dataSource = new MatTableDataSource(this.identificationsNew);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
