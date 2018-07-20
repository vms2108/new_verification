import { IdentificationService } from '../core/services/identification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from 'angular-l10n';
import { UsersService } from '../core/services';
import { User } from '../core/models';
import users from '../../assets/data/users.json';

@Component({
  selector: 'app-history-identification',
  templateUrl: './history-identification.component.html',
  styleUrls: ['./history-identification.component.scss']
})
export class HistoryIdentificationComponent implements OnInit {
  private identifications = [];
  private users: User[];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'user_id', 'reason', 'date', 'result', 'details'];
  @Language() lang: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private identificationService: IdentificationService,
  private usersService: UsersService) {
    this.identifications = this.identificationService.generateHistoryTable();
    this.dataSource = new MatTableDataSource(this.identifications);
  }
  loadUsers() {
    this.users = users;
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.usersService.generateVerificationQueue());
    console.log(this.usersService.nextVerification());
    this.usersService.nextVerification();
    this.usersService.updateUser(this.usersService.nextVerification());
    console.log(this.usersService.generateVerificationQueue());
  }
}
