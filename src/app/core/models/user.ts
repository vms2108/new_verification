export class User {
  id: string;
  info: {
    name: string;
    surname: string;
    date_of_birth: string;
    birth_country: string;

    post_index: string;
    country: string;
    district: string;
    city: string;
    street: string;
    home: string;
    flat: string;

    main_doc_type: string;
    main_doc_number: string;
    main_doc_validdate: string;
    main_doc_photo: string;
    main_doc_selfie: string;

    secondary_doc_type: string;
    secondary_doc_number: string;
    secondary_doc_validdate: string;
    secondary_doc_photo: string;
    secondary_doc_selfie: string;
  };
}
