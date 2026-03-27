interface ExpenseCategoryItem {
  textContent: string;
  value: string;
}

type ExpenseCategoriesFormatted = Array<ExpenseCategoryItem>;

export type { ExpenseCategoriesFormatted, ExpenseCategoryItem };
