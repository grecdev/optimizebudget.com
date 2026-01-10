enum ExpenseItemKey {
  ID = 'ID',
  NAME = 'NAME',
  CATEGORY = 'CATEGORY',
  PRICE = 'PRICE',
  TIMESTAMP = 'TIMESTAMP',
}

enum CategoryType {
  SHOPPING = 'Shopping',
  FOOD = 'Food',
  HOME = 'Home',
}

interface ExpenseItem {
  [ExpenseItemKey.ID]: number;
  [ExpenseItemKey.NAME]: string;
  [ExpenseItemKey.CATEGORY]: CategoryType;
  [ExpenseItemKey.PRICE]: number;
  [ExpenseItemKey.TIMESTAMP]: number;
}

export type { ExpenseItem };
export { ExpenseItemKey, CategoryType };
