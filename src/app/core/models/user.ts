export class User {
  id: string;
  info: {
    name: string;
    surname: string;
    date_of_birth: string;

    country: string;
    city: string;
    adress: string;

    main_doc_number: string;
    main_doc_validdate: string;
    main_doc_photo: string;
    main_doc_selfie: string;

    secondary_doc_number: string;
    secondary_doc_validdate: string;
    secondary_doc_photo: string;
  };
  identified: boolean;
  verifications: {
    id: number;
    amount: number;
    date: Date | string;
  }[];
  updated: Date | string;
  verification_status: number;
}
