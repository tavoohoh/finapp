export interface BudgetModel {
  id: string;
  name: string;
  amount: number;
  period_id: string;
}

export interface BudgetQueryModel {
  period_id: string;
}
