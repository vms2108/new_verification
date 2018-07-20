import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models';
import users from '../../../assets/data/users.json';

@Injectable()
export class UsersService {
  private users: User[];
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
    const status1 = this.getWaitingVerification();
    const status2 = this.getWaitingTransactionIdentification();
    const status3 = this.getWaitingInitiativeIdentification();
    return [...status1, ...status2, status3];
  }

  // ожидающие верификации
  getWaitingVerification() {
    return [];
  }

  // идентификации со статусом transaction
  getWaitingTransactionIdentification() {
    return [];
  }

  // идентификации со статусом initiative
  getWaitingInitiativeIdentification() {
    return [];
  }

  // загружает идентификацию / верификацию / главную страницу в зависимости от очереди
  nextVerification() {
    return {};
  }

  // обновляет пользователя после прохождения верификации / идентификации
  updateUser() {}

  // обновляет очередь
  updateQueue() {}

  // после успешного сохранения идентификации / верификации
  afterVerificatoinEnd() {
    this.updateUser();
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
