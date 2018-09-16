import { FieldsGroup } from '../../verification.models';

export const verificationFields: FieldsGroup[] = [
  {
    group: 'Personal data',
    fields: [
      'name',
      'surname',
      'date_of_birth',
      'country',
      'main_doc_type',
      'main_doc_number',
      'main_doc_expiration_date',
      'main_doc_photo'
    ]
  },
  {
    group: 'User verification',
    fields: ['Check terrorist', 'Check platform criterias']
  }
];

export const verificationReadonlyFields = [
  'name',
  'surname',
  'date_of_birth',
  'country',
  'main_doc_type',
  'main_doc_number',
  'main_doc_expiration_date',
  'main_doc_photo'
];
