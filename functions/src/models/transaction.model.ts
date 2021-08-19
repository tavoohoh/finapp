export interface TransactionModel {
  id: string;
  budget: string;
  name: string;
  amount: number;
  period_id: string;
  date: string;
  is_income: boolean;
}

export interface TransactionQueryModel {
  period_id?: string;
  budget?: string;
  date?: string;
}
