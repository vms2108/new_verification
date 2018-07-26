export class VerificationTableItem {
    id: number;
    user_id: string;
    deal_id: number;
    date: Date;
    result: string;
    user_name: string;
    user_surname: string;
    searchString?: string;
    verifier?: string;
}
