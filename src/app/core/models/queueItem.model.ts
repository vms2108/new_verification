export class QueueItem {
  id: string;
  userInfo: {};
  transactionId?: number;
  transactionAmount?: number;
  date?: string | Date;
  type: 'verification' | 'identification';
  identificationCause?: 'transaction' | 'initiative';
}
