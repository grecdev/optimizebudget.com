import { CategoryType } from '@shared/models/enums';

enum ExpenseItemKey {
  ID = 'ID',
  NAME = 'NAME',
  CATEGORY = 'CATEGORY',
  PRICE = 'PRICE',
  TIMESTAMP = 'TIMESTAMP',
}

interface ExpenseItem {
  [ExpenseItemKey.ID]: number;
  [ExpenseItemKey.NAME]: string;
  [ExpenseItemKey.CATEGORY]: CategoryType;
  [ExpenseItemKey.PRICE]: number;
  [ExpenseItemKey.TIMESTAMP]: number;
}

export type { ExpenseItem };
export { ExpenseItemKey };
