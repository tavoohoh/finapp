import { BudgetModel } from './budget.model';

export interface PeriodModel {
  date_start: string;
  budget: BudgetModel[];
  is_active: boolean;
  is_latest: boolean;
  total_income: number;
  total_expenses: number;
  difference: number;
  total_savings: number;
  date_end?: string;
  id?: string;
}

export interface PeriodApiModel {
  id: string;
  date_start: string;
  budget_amount: number;
}

export interface PeriodQueryModel {
  date_start?: string;
  date_end?: string;
  is_active?: boolean;
  is_latest?: boolean;
}
