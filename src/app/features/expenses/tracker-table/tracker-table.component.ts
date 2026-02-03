import { Component } from '@angular/core';

import { CategoryType, ExpenseStatus } from '@shared/models/enums';
import { StatusType } from '@shared/components/pill-status/pill-status.model';

import { type ExpenseItem, ExpenseItemKey } from './tracker-table.model';

@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.scss'],
})
export class TrackerTableComponent {
  public readonly ExpenseItemKey = ExpenseItemKey;
  public readonly StatusType = StatusType;
  public readonly ExpenseStatus = ExpenseStatus;

  public readonly displayedColumns: Array<ExpenseItemKey> = [
    ExpenseItemKey.TIMESTAMP,
    ExpenseItemKey.STATUS,
    ExpenseItemKey.DESCRIPTION,
    ExpenseItemKey.TOTAL,
  ];

  public dataSource: Array<ExpenseItem> = [
    {
      [ExpenseItemKey.TIMESTAMP]: 1706102400000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
      [ExpenseItemKey.DESCRIPTION]: 'Weekly grocery shopping',
      [ExpenseItemKey.TOTAL]: 82.37,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706188800000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.SHOPPING,
      [ExpenseItemKey.DESCRIPTION]: 'Bluetooth headphones',
      [ExpenseItemKey.TOTAL]: 59.99,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706275200000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PENDING,
      [ExpenseItemKey.CATEGORY]: CategoryType.HOME,
      [ExpenseItemKey.DESCRIPTION]: 'Bathroom cleaning supplies',
      [ExpenseItemKey.TOTAL]: 27.45,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706361600000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
      [ExpenseItemKey.DESCRIPTION]: 'Lunch with coworkers',
      [ExpenseItemKey.TOTAL]: 18.9,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706448000000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.SHOPPING,
      [ExpenseItemKey.DESCRIPTION]: 'Phone case replacement',
      [ExpenseItemKey.TOTAL]: 22.99,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706534400000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.CANCELLED,
      [ExpenseItemKey.CATEGORY]: CategoryType.HOME,
      [ExpenseItemKey.DESCRIPTION]: 'Desk lamp order',
      [ExpenseItemKey.TOTAL]: 34.5,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706620800000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
      [ExpenseItemKey.DESCRIPTION]: 'Coffee and pastry',
      [ExpenseItemKey.TOTAL]: 7.85,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706707200000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PENDING,
      [ExpenseItemKey.CATEGORY]: CategoryType.SHOPPING,
      [ExpenseItemKey.DESCRIPTION]: 'Winter gloves',
      [ExpenseItemKey.TOTAL]: 25.0,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706793600000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.HOME,
      [ExpenseItemKey.DESCRIPTION]: 'Replacement light bulbs',
      [ExpenseItemKey.TOTAL]: 16.78,
    },
    {
      [ExpenseItemKey.TIMESTAMP]: 1706880000000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
      [ExpenseItemKey.DESCRIPTION]: 'Takeout dinner',
      [ExpenseItemKey.TOTAL]: 24.6,
    },
  ];

  constructor(...args: Array<unknown>);
  constructor() {}
}
