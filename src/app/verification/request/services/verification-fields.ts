import { FieldsGroup } from '../../verification.models';

export const field = (name: string, parent?: string, stateless?: boolean) => {
  return { name, parent, stateless };
};

export const verificationFields: FieldsGroup[] = [
  {
    group: 'Personal data',
    fields: [
      field('first_name'),
      field('last_name'),
      field('birth_date'),
      field('index', 'address'),
      field('state', 'address'),
      field('country', 'address'),
      field('city', 'address'),
      field('street', 'address'),
      field('building', 'address'),
      field('apartment', 'address'),
      field('type', 'main_document', true),
      field('number', 'main_document', true),
      field('expiration_date', 'main_document', true),
      field('path', 'main_document', true),
    ]
  },
  {
    group: 'User verification',
    fields: [
      field('Check terrorist'),
      field('Check platform criterias')
    ]
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
