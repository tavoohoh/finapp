export interface TransactionModel {
  id: string;
  budget: string;
  name: string;
  amount: number;
}

export interface TransactionQueryModel {
  budget_id: string;
  period_id: string;
}
