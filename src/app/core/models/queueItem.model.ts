export class QueueItem {
  id: string;
  userInfo: {
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
  transactionId?: number;
  transactionAmount?: number;
  date?: string | Date;
  type: 'verification' | 'identification';
  identificationCause?: 'transaction' | 'initiative';
  queueIndex?: number;
}
