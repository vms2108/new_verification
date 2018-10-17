const group = (name: string, state: boolean, ...fields) => {
  return {
    name, state, fields
  };
};

const field = (name: string, parent?: string, stateless?: boolean) => {
  return { name, parent, stateless };
};

export const identificationFields = [
  group(
    'Basic data', false,
    field('first_name'),
    field('middle_name'),
    field('last_name'),
    field('birth_date'),
    field('birth_place'),
    field('phone')
  ),
  group(
    'Basic data', false,
    field('index', 'address'),
    field('state', 'address'),
    field('country', 'address'),
    field('city', 'address'),
    field('street', 'address'),
    field('building', 'address'),
    field('apartment', 'address')
  ),
  group(
    'Basic data', true,
    field('type', 'main_document', true),
    field('issue_date', 'main_document', true),
    field('expiration_date', 'main_document', true),
    field('number', 'main_document', true),
    field('path', 'main_document', true),
    field('selfie_path', 'main_document', true),
  ),
  group(
    'Basic data',  true,
    field('type', 'main_document', true),
    field('issue_date', 'main_document', true),
    field('expiration_date', 'main_document', true),
    field('number', 'main_document', true),
    field('path', 'main_document', true),
    field('selfie_path', 'main_document', true)
  )
];
