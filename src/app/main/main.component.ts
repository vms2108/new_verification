import { AuthInfo } from '../core/models/authInfo.model';
import { UserInfo } from '../core/models/userInfo.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Language } from 'angular-l10n';
import { UsersService } from '../core/services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public userInfo: UserInfo;
  dataVerification: MatTableDataSource<any>;
  dataIdentificationTransaction: MatTableDataSource<any>;
  dataIdentificationInitiative: MatTableDataSource<any>;
  dataDeals: MatTableDataSource<any>;
  veriicationColumns: string[] = ['number', 'id', 'date'];
  identificationColumns: string[] = ['number', 'id', 'date'];
  dealsColumns: string[] = ['number', 'transactionId', 'date', 'amount', 'waiting'];
  @Language() lang: string;
  @ViewChild('paginatorVer') paginatorVer: MatPaginator;
  @ViewChild('paginatorIdT') paginatorIdT: MatPaginator;
  @ViewChild('paginatorIdIn') paginatorIdIn: MatPaginator;
  @ViewChild('paginatorDeal') paginatorDeal: MatPaginator;

  constructor(private usersService: UsersService) {
    this.dataVerification = new MatTableDataSource(this.waitingVerification);
    this.dataIdentificationTransaction = new MatTableDataSource(this.waitingIdentificationTransaction);
    this.dataIdentificationInitiative = new MatTableDataSource(this.waitingIdentificationInitiative);
    this.dataDeals = new MatTableDataSource(this.waitingDeal);
  }

  ngOnInit() {
    this.dataVerification.paginator = this.paginatorVer;
    this.dataIdentificationTransaction.paginator = this.paginatorIdT;
    this.dataIdentificationInitiative.paginator = this.paginatorIdIn;
    this.dataDeals.paginator = this.paginatorDeal;
    window.scrollTo(0, 0);
  }
  get waitingVerification() {
    return this.usersService.getWaitingVerification().map((item, i) => {
      item.queueIndex = i;
      return item;
    });
  }
  get waitingIdentificationTransaction() {
    return this.usersService.getWaitingTransactionIdentification().map((item, i) => {
      item.queueIndex = i;
      return item;
    });
  }
  get waitingIdentificationInitiative() {
    return this.usersService.getWaitingInitiativeIdentification().map((item, i) => {
      item.queueIndex = i;
      return item;
    });
  }
  get waitingDeal() {
    return this.usersService.getWaitingDeal().map((item, i) => {
      item.queueIndex = i;
      return item;
    });
  }
}
