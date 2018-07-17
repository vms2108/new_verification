import { History } from '../models/history.model';
import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable()
export class IdentificationService {
  public user: User;
  public historyItem: History;
  constructor() {}
  historyItems = [];
  identifications = [];
  toTable = [];
  next_id = 0;
  addHistoryItem(data) {
    const currentData = new Date();
  }
  getHistoryItems() {
    return this.historyItems;
  }
  saveIdentifications(data: any, id: string) {
    const currentData = new Date();
    this.next_id ++;
    this.identifications.push(this.next_id, id, 2, currentData, data);
    this.toTable.push({'next_id': this.next_id, 'user_id': id, 'reason': 2, 'date': currentData, 'result': true});
  }
  generateHistoryTable() {
    return this.toTable;
  }
}
