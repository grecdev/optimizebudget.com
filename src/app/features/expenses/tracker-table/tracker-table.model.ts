import { CategoryType, ExpenseStatus } from '@shared/models/enums';

enum ExpenseItemKey {
  ID = 'ID',
  TIMESTAMP = 'TIMESTAMP',
  STATUS = 'STATUS',
  CATEGORY = 'CATEGORY',
  DESCRIPTION = 'DESCRIPTION',
  TOTAL = 'TOTAL',
}

interface ExpenseItem {
  [ExpenseItemKey.ID]: number;
  [ExpenseItemKey.TIMESTAMP]: number;
  [ExpenseItemKey.STATUS]: ExpenseStatus;
  [ExpenseItemKey.CATEGORY]: CategoryType;
  [ExpenseItemKey.DESCRIPTION]: string;
  [ExpenseItemKey.TOTAL]: number;
}

export type { ExpenseItem };
export { ExpenseItemKey };
