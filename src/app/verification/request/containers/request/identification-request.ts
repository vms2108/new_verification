import { Application } from '../../../verification.models';

export const identificationRequest: Application = {
  id: '11123',
  type: 'verification',
  date_of_creation: '2017-11-09T21:00:00.000Z',
  expiration_date: '2018-11-07T21:55:34.964Z',
  user_data: {
    first_name: {
      value: 'Konstantin'
    },
    last_name: {
      value: 'Konstantinopolskiy'
    },
    birth_place: {
      value: 'Muckanaghederdauhaulia'
    },
    birth_date: {
      value: '1990-10-09T21:00:00.000Z'
    },
    phone: [{
      id: 1,
      country_code: '+7',
      number: '910-440-91-24'
    }],
    address: {
      index: {
        value: '107150'
      },
      state: {
        value: 'Mamungkukumpurangkuntjunya'
      },
      country: {
        value: 'Gasselterboerveenschemond'
      },
      city: {
        value: 'Venkatanarasimharajuvaripeta'
      },
      street: {
        value: 'Pekwachnamaykoskwaskwaypinwanik'
      },
      building: {
        value: '29'
      },
      apartment: {
        value: '18'
      },
    },
    main_document: {
      id: '123',
      type: 'ID',
      number: '32423421',
      path: '/assets/images/8.jpg',
      selfie_path: '/assets/images/passport_selfie.jpg',
      endless: false
    },
    extra_document: {
      id: '234',
      type: 'ID',
      number: '32423421',
      path: '/assets/images/8.jpg',
      selfie_path: '/assets/images/passport_selfie.jpg',
      endless: false
    }
  }
};
