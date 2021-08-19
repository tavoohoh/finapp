export interface BudgetModel {
  id: string;
  name: string;
  amount: number;
  spent: number;
  enabled: boolean;
}

export interface BudgetQueryModel {
  period_id: string;
}
