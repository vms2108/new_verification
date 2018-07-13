import { History } from './../models/history.model';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable()
export class HistoryVerificationService {
    public historyItem: History;
    constructor() {}
    historyItems = [];
    addHistoryItem(data) {
        const currentData = new Date;
        this.historyItem = new History (1, 21, 45, currentData , data);
        this.historyItems.push(this.historyItem);
    }
    getHistoryItems() {
        return this.historyItems;
    }
}
