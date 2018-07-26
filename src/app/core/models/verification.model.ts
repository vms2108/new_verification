export class Verification {
    id: number;
    user_id: string;
    deal_id: number;
    date: Date;
    result: string;
    verifier?: string;
    user_info: {
      name: string;
      surname: string;
      date_of_birth: Date | string;
      country: string;
      main_doc_number: string;
      main_doc_validdate: string;
      main_doc_photo: string;
    };
    test: {
        inner_list: boolean;
        list_of_terror: boolean;
    };
  }
