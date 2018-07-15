import { Injectable } from '@angular/core';
import { User } from '../models';

const users: User[] = [
  {
    id: '1',
    info: {
      name: 'Max',
      surname: 'Golovach',
      date_of_birth: '1990-10-10T14:48:00',
      birth_country: 'Russia',

      post_index: '11122233',
      country: 'Russia',
      district: 'Rostovskaya oblast',
      city: 'Rostov',
      street: 'Vyborgskaya',
      home: '16',
      flat: '13',

      main_doc_type: 'passport',
      main_doc_number: '1234 6666789',
      main_doc_validdate: '2020-10-10T14:48:00',
      main_doc_photo: 'assets/passport_scan.jpg',
      main_doc_selfie: 'assets/passport_selfie.jpg',

      secondary_doc_type: 'driver id',
      secondary_doc_number: '478099325',
      secondary_doc_validdate: '2025-10-10T14:48:00',
      secondary_doc_photo: 'assets/passport_scan.jpg',
      secondary_doc_selfie: 'assets/passport_selfie.jpg'
    }
  }
];

@Injectable()
export class UsersService {
  getUser(): User {
    return users[0];
  }
}
