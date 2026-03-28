import { CategoryType } from '@shared/models/enums';

interface TotalExpensesCountItem {
  id: number;
  count: number;
  type: CategoryType;
}

export type { TotalExpensesCountItem };
