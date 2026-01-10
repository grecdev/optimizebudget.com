import { Component } from '@angular/core';

import { type ExpenseItem, ExpenseItemKey, CategoryType } from './top-expenses.model';

const TOP_EXPENSES: Array<ExpenseItem> = [
  {
    [ExpenseItemKey.ID]: 0,
    [ExpenseItemKey.NAME]: 'Laptop for work',
    [ExpenseItemKey.CATEGORY]: CategoryType.SHOPPING,
    [ExpenseItemKey.PRICE]: 2000,
    [ExpenseItemKey.TIMESTAMP]: 1767853992492,
  },
  {
    [ExpenseItemKey.ID]: 1,
    [ExpenseItemKey.NAME]: 'Shaorma',
    [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
    [ExpenseItemKey.PRICE]: 20,
    [ExpenseItemKey.TIMESTAMP]: 1768051385012,
  },
  {
    [ExpenseItemKey.ID]: 2,
    [ExpenseItemKey.NAME]: 'Lamp',
    [ExpenseItemKey.CATEGORY]: CategoryType.HOME,
    [ExpenseItemKey.PRICE]: 5,
    [ExpenseItemKey.TIMESTAMP]: 1768052221606,
  },
];

const DISPLAYED_COLUMNS: Array<string> = [
  ExpenseItemKey.NAME,
  ExpenseItemKey.CATEGORY,
  ExpenseItemKey.PRICE,
  ExpenseItemKey.TIMESTAMP,
];

@Component({
  selector: 'app-top-expenses',
  templateUrl: './top-expenses.component.html',
  styleUrls: ['./top-expenses.component.scss'],
})
export class TopExpensesComponent {
  public readonly expenseItemKey = ExpenseItemKey;

  public dataSource = TOP_EXPENSES;
  public displayedColumns = DISPLAYED_COLUMNS;
}
