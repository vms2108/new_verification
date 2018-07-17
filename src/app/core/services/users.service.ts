import { Injectable } from '@angular/core';
import { User } from '../models';

const users: User[] = [
  {
    id: '1',
    info: {
      name: 'Max',
      surname: 'Golovach',
      date_of_birth: '1990-10-10T14:48:00',

      country: 'Russia',
      city: 'Rostov',
      adress: 'Vyborgskaya 16-13',

      main_doc_number: '1234 6666789',
      main_doc_validdate: '2020-10-10T14:48:00',
      main_doc_photo: 'assets/passport_scan.jpg',
      main_doc_selfie: 'assets/passport_selfie.jpg',

      secondary_doc_number: '478099325',
      secondary_doc_validdate: '2025-10-10T14:48:00',
      secondary_doc_photo: 'assets/passport_scan.jpg'
    }
  },
  {
    id: '2',
    info: {
      name: 'Artem',
      surname: 'Usach',
      date_of_birth: '1992-12-12T14:48:00',

      country: 'Russia',
      city: 'Kukuevo',
      adress: 'Lenina 2',

      main_doc_number: '1234 6666789',
      main_doc_validdate: '2020-10-10T14:48:00',
      main_doc_photo: 'assets/passport_scan.jpg',
      main_doc_selfie: 'assets/passport_selfie.jpg',

      secondary_doc_number: '478099325',
      secondary_doc_validdate: '2025-10-10T14:48:00',
      secondary_doc_photo: 'assets/passport_scan.jpg'
    }
  },
  {
    id: '3',
    info: {
      name: 'Ivan',
      surname: 'Borodach',
      date_of_birth: '1980-10-10T14:48:00',

      country: 'Russia',
      city: 'Perm',
      adress: 'Pushkina 10-11',

      main_doc_number: '1234 6666789',
      main_doc_validdate: '2020-10-10T14:48:00',
      main_doc_photo: 'assets/passport_scan.jpg',
      main_doc_selfie: 'assets/passport_selfie.jpg',

      secondary_doc_number: '478099325',
      secondary_doc_validdate: '2025-10-10T14:48:00',
      secondary_doc_photo: 'assets/passport_scan.jpg'
    }
  }
];

@Injectable()
export class UsersService {
  getUser(): User {
    return users[0];
  }
}
