import { Injectable } from '@angular/core';

@Injectable()
export class IdentificationService {
  constructor() {}
  identifications = [];
  next_id = 0;
  saveIdentifications(data: any, id: string, result: boolean, reason: number) {
    const currentData = new Date();
    this.next_id ++;
    this.identifications.push({'next_id': this.next_id, 'user_id': id, 'reason': reason,
    'date': currentData, 'result': result, 'data': data});

  }
  generateHistoryTable() {
    return this.identifications.map((obj) => {
      const forTable = [];
      forTable['next_id'] = obj.next_id;
      forTable['user_id'] = obj.user_id;
      forTable['reason'] = obj.reason;
      forTable['date'] = obj.date;
      forTable['result'] = obj.result;
      forTable['user_name'] = obj.data.name.value;
      forTable['user_surname'] = obj.data.surname.value;
      return forTable;
    });
  }
}
