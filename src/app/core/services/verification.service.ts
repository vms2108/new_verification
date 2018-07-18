import { Verification } from '../models/verification.model';
import { History } from '../models/history.model';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { VerificationTableItem } from '../models/verificationTableItem.model';

@Injectable()
export class VerificationService {
  constructor() {}
  private verifications: Verification[] = [
    {
      id: 1,
      user_id: '11',
      deal_id: 2,
      date: '2018-07-12',
      result: 'pass',
      user_info: {
        name: 'Ivan',
        surname: 'Ivanov',
        date_of_birth: '04.11.1985',
        country: 'Russia',
        main_doc_number: '1122 334455',
        main_doc_validdate: '456456',
        main_doc_photo: 'assets/passport_scan.jpg',
      },
      test: {
        inner_list: true,
        list_of_terror: true
      }
    }
  ];
  saveIdentifications(user_info: any, test: any, id: string, result: string, deal_id: number) {
    const currentData = new Date();
    const next_id = this.verifications.length + 1;
    this.verifications.push({'id': next_id, 'user_id': id, 'deal_id': deal_id,
    'date': currentData, 'result': result, 'user_info': user_info, 'test': test});
  }
  generateHistoryTable(): VerificationTableItem[] {
    return this.verifications.map((obj: Verification): VerificationTableItem => {
      const {
        id,
        user_id,
        deal_id,
        date,
        result,
        user_info: {
          name: user_name,
          surname: user_surname
        }
      } = obj;
      return {
        id,
        user_id,
        deal_id,
        date,
        result,
        user_name,
        user_surname
      };
    });
  }
}
