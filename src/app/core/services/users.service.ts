import { Verification } from './../models/verification.model';
import { element } from 'protractor';
import { UserInfo } from './../models/userInfo.model';
import { QueueItem } from './../models/queueItem.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models';

import users from '../../../assets/data/users.json';
import userInfo from '../../../assets/data/userInfo.json';
import { find, remove } from 'lodash'

@Injectable()
export class UsersService {
  private users: User[];
  private userInfo: UserInfo[];
  private queue: any[];

  public queueUpdated = new Subject<any>();

  getUser(): User {
    return this.users[0];
  }

  constructor() {
    this.init();
  }

  loadUsers() {
    this.users = users;
  }

  loadUserInfo() {
    this.userInfo = userInfo;
  }

  getUserVerificationStatus(userList: User[]): User[] {
    return userList.map(
      (obj: User): User => {
        let status = 0;
        const identified = obj.identified;
        const needVerifications = obj.verifications.length;
        if (identified === false && !needVerifications) {
          status = 3;
        }
        if (identified === false && needVerifications) {
          status = 2;
        }
        if (identified === true && needVerifications) {
          status = 1;
        }
        obj.verification_status = status;
        return obj;
      }
    );
  }

  // генерирует очередь пользователей
  generateVerificationQueue() {
    const queue: QueueItem[] = [];
    this.getWaitingVerification().forEach((item: QueueItem) => {
      queue.push(item);
    });
    this.getWaitingTransactionIdentification().forEach((item: QueueItem) => {
      queue.push(item);
    });
    this.getWaitingInitiativeIdentification().forEach((item: QueueItem) => {
      queue.push(item);
    });
    return queue;
  }

  // ожидающие верификации
  getWaitingVerification() {
    const waitingVerifications = this.getUserVerificationStatus(users).filter(
      user => user.verification_status === 1
    );
    const queue: QueueItem[] = [];
    waitingVerifications.forEach((user: User) => {
      user.verifications.forEach((verification: {id: number, amount: number, date: string}) => {
        queue.push({id: user.id, userInfo: user.info, transactionId: verification.id, type: 'verification',
        transactionAmount: verification.amount, date: new Date(verification.date) });
      });
    });
    return queue.sort((n1, n2): number => {
      if (n1.transactionAmount < n2.transactionAmount) {
        return 1;
      } else {
        if (n1.transactionAmount === n2.transactionAmount && n1.date > n2.date) {
          return 1;
        }
      }
    });
  }

  // идентификации со статусом transaction
  getWaitingTransactionIdentification() {
    const waitingVerifications = this.getUserVerificationStatus(users).filter(
      user => user.verification_status === 2
    );
    const queue: QueueItem[] = [];
    waitingVerifications.forEach((user: User) => {
        queue.push({id: user.id, userInfo: user.info, type: 'identification', date: new Date(user.verifications[0].date),
        identificationCause: 'transaction'});
    });
    return queue.sort((n1, n2): number => {
        if (n1.date > n2.date) {
          return 1;
        }
    });
  }

  // идентификации со статусом initiative
  getWaitingInitiativeIdentification() {
    const waitingVerifications = this.getUserVerificationStatus(users).filter(
      user => user.verification_status === 3
    );
    const queue: QueueItem[] = [];
    waitingVerifications.forEach((user: User) => {
        queue.push({id: user.id, userInfo: user.info, type: 'identification', date: new Date(user.updated),
        identificationCause: 'initiative'});
    });
    return queue.sort((n1, n2): number => {
        if (n1.date > n2.date) {
          return 1;
        }
    });
  }

  // загружает идентификацию / верификацию / главную страницу в зависимости от очереди
  nextVerification() {
    if (this.generateVerificationQueue()[0]) {
      return this.generateVerificationQueue()[0];
    } else {
      return undefined;
    }
  }
  getUserById(id): User {
    return this.users.find(user => user.id === id);
  }

  updateUser(item: QueueItem) {
    //this.getUserById(item.id).verifications.remove(verification => verification.id === item.id);

   /*  this.users.forEach((user: User) => {
      if (user.id === item.id) {
        user.identified = true;
        user.verifications.forEach((verification: {id: number, amount: number, date: string}) => {
          if (verification.id === item.transactionId) {
            delete verification;
          }
        });
      }
    }); */
  }

  // обновляет очередь
  updateQueue() {}

  // после успешного сохранения идентификации / верификации
  afterVerificatoinEnd(item: QueueItem) {
    this.updateUser(item);
    this.updateQueue();
    this.nextVerification();
  }

  init() {
    // загружаем пользователей
    this.loadUsers();

    // формируем статусы
    this.users = this.getUserVerificationStatus(this.users);

    // создаем очередь
    this.queue = this.generateVerificationQueue();

    // переходим к следующему в очереди

    // сохраняем / обновляем пока не закончаться люди в очереди
  }
}
