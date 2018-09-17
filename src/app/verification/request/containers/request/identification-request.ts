import { Application } from '../../../verification.models';

export const identificationRequest: Application = {
  id: '11123',
  type: 'verification',
  date_of_creation: '2017-11-09T21:00:00.000Z',
  user_data: {
    name: 'Konstantin',
    surname: 'Konstantinopolskiy',
    second_name: 'Konstantinovich',
    date_of_birth: '10.10.1994',
    place_of_birth: 'Muckanaghederdauhaulia',
    phone_number: '+79104419425',
    postal_code: '107150',
    country: 'Gasselterboerveenschemond',
    state: 'Mamungkukumpurangkuntjunya',
    city: 'Venkatanarasimharajuvaripeta',
    street: 'Pekwachnamaykoskwaskwaypinwanik',
    house: '29',
    flat: '18',
    main_doc_type: 'passport',
    main_doc_number: '4513 508210',
    main_doc_expiration_date: '29.05.2024',
    main_doc_photo: '/assets/images/passport_scan.jpg',
    main_doc_selfie: '/assets/images/passport_selfie.jpg',
    additional_doc_type: 'driver id',
    additional_doc_expiration_date: '',
    additional_doc_photo: '/assets/images/8.jpg',
    additional_doc_selfie: '/assets/images/passport_selfie.jpg'
  }
};
