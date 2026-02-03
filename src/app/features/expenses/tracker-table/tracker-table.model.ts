import { CategoryType, ExpenseStatus } from '@shared/models/enums';

enum ExpenseItemKey {
  TIMESTAMP = 'TIMESTAMP',
  STATUS = 'STATUS',
  CATEGORY = 'CATEGORY',
  DESCRIPTION = 'DESCRIPTION',
  TOTAL = 'TOTAL',
}

interface ExpenseItem {
  [ExpenseItemKey.TIMESTAMP]: number;
  [ExpenseItemKey.STATUS]: ExpenseStatus;
  [ExpenseItemKey.CATEGORY]: CategoryType;
  [ExpenseItemKey.DESCRIPTION]: string;
  [ExpenseItemKey.TOTAL]: number;
}

export type { ExpenseItem };
export { ExpenseItemKey };
