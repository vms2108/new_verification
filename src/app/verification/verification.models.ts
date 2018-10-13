export interface Application {
  id: string;
  type: 'verification' | 'identification';
  date_of_creation: string;
  expiration_date: string;
  user_data: ApplicationtUserData;
}

export interface ApplicationtUserData {
  first_name: ApplicationUserField;
  middle_name?: ApplicationUserField;
  last_name: ApplicationUserField;
  birth_place: ApplicationUserField;
  birth_date: ApplicationUserField;

  phone: {
    id: number;
    country_code?: string;
    number?: string;
  }[];

  address: {
    index: ApplicationUserField;
    state: ApplicationUserField;
    country: ApplicationUserField;
    city: ApplicationUserField;
    street: ApplicationUserField;
    building: ApplicationUserField;
    apartment: ApplicationUserField;
  };

  main_document: ApplicationDocument;
  extra_document: ApplicationDocument;
}

export interface ApplicationDocument {
  id: string;
  type: 'ID' | 'DRIVER_ID' | 'BANK_STATEMENT' | 'OTHER';
  type_custom?: string;
  issue_date?: string;
  expiration_date?: string;
  number: string;
  path: string;
  selfie_path: string;
  endless: boolean;
}

export interface ApplicationUserField {
  value: string;
}

export interface IdentificatonRequest {
  id: string;
  result: boolean;
  user_data: {
    [key: string]: {
      state: boolean;
      message?: string;
    };
  };
}

export interface VerificationRequest {
  id: string;
  result: boolean;
  is_blacklisted: boolean;
  is_terrorist: boolean;
}

export interface FieldsGroup {
  group: string;
  fields: RequestField[];
}

export interface RequestField {
  name: string;
  parent?: string;
  stateless?: boolean;
}
