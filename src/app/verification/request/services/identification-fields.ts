import { FieldsGroup } from '../../verification.models';

export const field = (name: string, parent?: string, stateless?: boolean) => {
  return { name, parent, stateless };
};

export const identificationFields: FieldsGroup[] = [
  {
    group: 'Basic data',
    fields: [
      field('first_name'),
      field('middle_name'),
      field('last_name'),
      field('birth_date'),
      field('birth_place'),
      field('phone')
    ]
  },
  {
    group: 'Location',
    fields: [
      field('index', 'address'),
      field('state', 'address'),
      field('country', 'address'),
      field('city', 'address'),
      field('street', 'address'),
      field('building', 'address'),
      field('apartment', 'address')
    ]
  },
  {
    group: 'Basic document',
    fields: [
      field('id', 'main_document', true),
      field('type', 'main_document', true),
      field('type_custom', 'main_document', true),
      field('issue_date', 'main_document', true),
      field('expiration_date', 'main_document', true),
      field('number', 'main_document', true),
      field('path', 'main_document', true),
      field('selfie_path', 'main_document', true),
      field('endless', 'main_document', true)
    ]
  },
  {
    group: 'Additional document',
    fields: [
      field('id', 'main_document', true),
      field('type', 'main_document', true),
      field('type_custom', 'main_document', true),
      field('issue_date', 'main_document', true),
      field('expiration_date', 'main_document', true),
      field('number', 'main_document', true),
      field('path', 'main_document', true),
      field('selfie_path', 'main_document', true),
      field('endless', 'main_document', true)
    ]
  }
];

export const identificationPhotoFields = [
  'path',
  'selfie_path'
];
