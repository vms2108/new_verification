import { Identification } from '../models/identification.model';
import { Injectable } from '@angular/core';
import { IdentificationTableItem } from '../models/identificationTableItem.model';
import { UsersService } from './users.service';
import { QueueItem } from '../models/queueItem.model';

@Injectable()
export class IdentificationService {
  constructor(private usersService: UsersService) {}
  private identifications: Identification[] = [
    {
      id: 1,
      user_id: '11',
      reason: 2,
      date: new Date ('2018-07-12'),
      result: 'pass',
      data: {
          name: {
          value: 'Ivan',
          state: true,
          message: '',
        },
        surname: {
          value: 'Ivanov',
          state: true,
          message: '',
        },
        date_of_birth: {
          value: '04.11.1985',
          state: true,
          message: '',
        },
        country: {
          value: 'Russia',
          state: true,
          message: '',
        },
        city: {
          value: 'Saransk',
          state: true,
          message: '',
        },
        adress: {
          value: 'Big Red House',
          state: true,
          message: '',
        },
        main_doc_number: {
          value: '1122 334455',
          state: true,
          message: '',
        },
        main_doc_validdate: {
          value: '04.11.2085',
          state: true,
          message: '',
        },
        main_doc_photo: {
          value: 'assets/passport_scan.jpg',
          state: true,
          message: '',
        },
        main_doc_selfie: {
          value: 'assets/passport_selfie.jpg',
          state: true,
          message: '',
        },
        secondary_doc_number: {
          value: '223366',
          state: true,
          message: '',
        },
        secondary_doc_validdate: {
          value: '04.11.2225',
          state: true,
          message: '',
        },
        secondary_doc_photo: {
          value: 'assets/passport_scan.jpg',
          state: true,
          message: '',
        },
      }
    },
    {
      id: 2,
      user_id: '12',
      reason: 3,
      date: new Date ('2018-07-13'),
      result: 'fail',
      data: {
          name: {
          value: 'Sidor',
          state: true,
          message: '',
        },
        surname: {
          value: 'Sidorov',
          state: true,
          message: '',
        },
        date_of_birth: {
          value: '04.11.1955',
          state: true,
          message: '',
        },
        country: {
          value: 'Russia',
          state: true,
          message: '',
        },
        city: {
          value: 'Bryansk',
          state: true,
          message: '',
        },
        adress: {
          value: 'Pushkina 6-24',
          state: true,
          message: '',
        },
        main_doc_number: {
          value: '1122 334455',
          state: false,
          message: '',
        },
        main_doc_validdate: {
          value: '04.11.2085',
          state: false,
          message: '',
        },
        main_doc_photo: {
          value: 'assets/passport_scan.jpg',
          state: false,
          message: '',
        },
        main_doc_selfie: {
          value: 'assets/passport_selfie.jpg',
          state: true,
          message: '',
        },
        secondary_doc_number: {
          value: '223366',
          state: true,
          message: '',
        },
        secondary_doc_validdate: {
          value: '04.11.2225',
          state: true,
          message: '',
        },
        secondary_doc_photo: {
          value: 'assets/passport_scan.jpg',
          state: true,
          message: '',
        },
      }
    }
  ];
  saveIdentifications(data: any, id: string, result: string, reason: number) {
    const currentData = new Date();
    const next_id = this.identifications.length + 1;
    this.identifications.push({'id': next_id, 'user_id': id, 'reason': reason,
    'date': currentData, 'result': result, 'data': data});
  }
  generateHistoryTable(): IdentificationTableItem[] {
    const haveResult = this.identifications.map((obj: Identification): IdentificationTableItem => {
      const {
        id,
        user_id,
        reason,
        date,
        result,
        data: {
          name: { value: user_name},
          surname: { value: user_surname}
        }
      } = obj;
      return {
        id,
        user_id,
        reason,
        date,
        result,
        user_name,
        user_surname,
        searchString: `${user_id} ${user_name} ${user_surname}`
      };
    });
    const waitingTransaction = this.usersService.getWaitingTransactionIdentification().map((obj: QueueItem): IdentificationTableItem => {
      const {
        queueIndex: id,
        id: user_id,
        userInfo: {
          name: user_name,
          surname: user_surname
        }
      } = obj;
      return {
        id,
        user_id,
        reason: 2,
        date: new Date(),
        result: 'waiting',
        user_name,
        user_surname,
        searchString: `${user_id} ${user_name} ${user_surname}`
      };
    });
    const waitingInitiative = this.usersService.getWaitingInitiativeIdentification().map((obj: QueueItem): IdentificationTableItem => {
      const {
        queueIndex: id,
        id: user_id,
        userInfo: {
          name: user_name,
          surname: user_surname
        }
      } = obj;
      return {
        id,
        user_id,
        reason: 3,
        date: new Date(),
        result: 'waiting',
        user_name,
        user_surname,
        searchString: `${user_id} ${user_name} ${user_surname}`
      };
    });
    let tableItems = [...waitingTransaction, ...waitingInitiative, ...haveResult];

   /*  waitingTransaction.forEach((item) => {
      tableItems.push(item);
    });
    waitingInitiative.forEach((item) => {
      tableItems.push(item);
    });
    haveResult.forEach((item) => {
      tableItems.push(item);
    }); */
    tableItems = tableItems.map((i, index) => { i.id = index + 1; return i; }).sort((a, b) =>
    (b.date).getTime() - (a.date).getTime());
    return tableItems;
  }
}
