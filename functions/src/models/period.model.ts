import { BudgetModel } from './budget.model';

export interface PeriodModel {
  id: string;
  date_start: string;
  date_end: string;
  budgets: BudgetModel[];
}

export interface PeriodQueryModel {
  date_start: string;
  date_end: string;
}
