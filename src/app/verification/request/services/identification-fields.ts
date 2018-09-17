import { FieldsGroup } from '../../verification.models';

export const identificationFields: FieldsGroup[] = [
  {
    group: 'Basic data',
    fields: ['name', 'surname', 'second_name', 'date_of_birth', 'place_of_birth', 'phone_number']
  },
  {
    group: 'Location',
    fields: ['postal_code', 'country', 'state', 'city', 'street', 'house', 'flat']
  },
  {
    group: 'Basic document',
    fields: ['main_doc_type', 'main_doc_number', 'main_doc_expiration_date', 'main_doc_photo', 'main_doc_selfie']
  },
  {
    group: 'Additional document',
    fields: ['additional_doc_type', 'additional_doc_expiration_date', 'additional_doc_photo', 'additional_doc_selfie']
  }
];

export const identificationPhotoFields = [
  'main_doc_photo',
  'main_doc_selfie',
  'additional_doc_photo',
  'additional_doc_selfie'
];
