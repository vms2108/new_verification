export interface Application {
  id: string;
  type: 'verification' | 'identification';
  date_of_creation: string;
  user_data: ApplicationtUserData;
}

export interface ApplicationtUserData {
  name: string;
  surname: string;
  second_name: string;
  date_of_birth: string;
  place_of_birth: string;
  phone_number: string;

  postal_code: string;
  country: string;
  state: string;
  city: string;
  street: string;
  house: string;
  flat: string;

  main_doc_type: string;
  main_doc_number: string;
  main_doc_expiration_date: string;
  main_doc_photo: string;
  main_doc_selfie: string;

  additional_doc_type: string;
  additional_doc_number: string;
  additional_doc_expiration_date: string;
  additional_doc_photo: string;
  additional_doc_selfie: string;
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
  fields: string[];
}
