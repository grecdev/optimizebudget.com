import { CategoryType } from '@shared/models/enums';

interface CategoryExpenseItem {
  id: number;
  name: CategoryType;
  value: number;
  color: string;
}

export type { CategoryExpenseItem };
