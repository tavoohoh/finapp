export interface BudgetModel {
  id: string;
  name: string;
  amount: number;
  spent: number;
  enabled: boolean;
}

export interface BudgetDetailApiModel {
  id: string;
  name: string;
  amount: number;
  spent: number;
  transactions: {
    id: string;
    name: string;
    amount: number;
    date: string;
  }[];
}

export interface BudgetQueryModel {
  period_id: string;
}
