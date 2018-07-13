import { HistoryVerificationService } from './../core/services/history-verification.service';
import { Component, OnInit } from '@angular/core';
import { StaticDataSource } from '../core/services/static.datasource';
import { History } from '../core/models/history.model';

@Component({
  selector: 'app-history-verification',
  templateUrl: './history-verification.component.html',
  styleUrls: ['./history-verification.component.scss'],
  providers: [StaticDataSource]
})
export class HistoryVerificationComponent implements OnInit {
  private history: History[] = [];
  constructor(private historyVerificationService: HistoryVerificationService) { }

  ngOnInit() {
  }

  get Records() {
    return this.historyVerificationService.getHistoryItems();
  }
}
