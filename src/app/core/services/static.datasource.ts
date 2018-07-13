import { Injectable } from '@angular/core';
import { History } from '../models/history.model';

@Injectable()
export class StaticDataSource {
    private history: History[] = [
        new History(1, 12, 225, '04.04.2018', 'pass'),
        new History(1, 12, 225, '04.04.2018', 'pass'),
        new History(1, 12, 225, '04.04.2018', 'pass'),
        new History(1, 12, 225, '04.04.2018', 'fail'),
        new History(1, 12, 225, '04.04.2018', 'fail'),
        new History(1, 12, 225, '04.04.2018', 'fail'),
        new History(1, 12, 225, '04.04.2018', 'fail'),
        new History(1, 12, 225, '04.04.2018', 'waiting'),
        new History(1, 12, 225, '04.04.2018', 'waiting'),
        new History(1, 12, 225, '04.04.2018', 'waiting'),
        new History(1, 12, 225, '04.04.2018', 'waiting'),
    ];
    getHistory(): History[] {
        return this.history;
    }
}
