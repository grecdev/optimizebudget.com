interface ExpenseSelectOptionItem {
  textContent: string;
  value: string;
}

type ExpenseSelectOptionsFormatted = Array<ExpenseSelectOptionItem>;

export type { ExpenseSelectOptionsFormatted, ExpenseSelectOptionItem };
