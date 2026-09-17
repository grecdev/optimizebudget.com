import { CategoryType, ExpenseStatus } from '@shared/models/enums';

enum ExpenseItemKey {
  ID = 'id',
  DATE_CREATED = 'date_created',
  STATUS = 'status',
  CATEGORY = 'category',
  NAME = 'name',
  TOTAL = 'total',
}

interface ExpenseItem {
  [ExpenseItemKey.ID]: number;
  [ExpenseItemKey.DATE_CREATED]: string;
  [ExpenseItemKey.STATUS]: ExpenseStatus;
  [ExpenseItemKey.CATEGORY]: CategoryType;
  [ExpenseItemKey.NAME]: string;
  [ExpenseItemKey.TOTAL]: number;
}

export type { ExpenseItem };
export { ExpenseItemKey };
