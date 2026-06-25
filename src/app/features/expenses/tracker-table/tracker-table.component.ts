import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { CategoryType, ExpenseStatus } from '@shared/models/enums';
import { StatusType } from '@shared/components/pill-status/pill-status.model';

import { type ExpenseItem, ExpenseItemKey } from './tracker-table.model';
import { MediaQueryService } from '@shared/services/media-query/media-query.service';

@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      [ExpenseItemKey.ID]: 0,
      [ExpenseItemKey.TIMESTAMP]: 1706102400000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
      [ExpenseItemKey.DESCRIPTION]: 'Weekly grocery shopping',
      [ExpenseItemKey.TOTAL]: 82.37,
    },
    {
      [ExpenseItemKey.ID]: 1,
      [ExpenseItemKey.TIMESTAMP]: 1706188800000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.GADGETS,
      [ExpenseItemKey.DESCRIPTION]: 'Bluetooth headphones',
      [ExpenseItemKey.TOTAL]: 59.99,
    },
    {
      [ExpenseItemKey.ID]: 2,
      [ExpenseItemKey.TIMESTAMP]: 1706275200000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PENDING,
      [ExpenseItemKey.CATEGORY]: CategoryType.HOME,
      [ExpenseItemKey.DESCRIPTION]: 'Bathroom cleaning supplies',
      [ExpenseItemKey.TOTAL]: 27.45,
    },
    {
      [ExpenseItemKey.ID]: 3,
      [ExpenseItemKey.TIMESTAMP]: 1706361600000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
      [ExpenseItemKey.DESCRIPTION]: 'Lunch with coworkers',
      [ExpenseItemKey.TOTAL]: 18.9,
    },
    {
      [ExpenseItemKey.ID]: 4,
      [ExpenseItemKey.TIMESTAMP]: 1706448000000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.GADGETS,
      [ExpenseItemKey.DESCRIPTION]: 'Phone case replacement',
      [ExpenseItemKey.TOTAL]: 22.99,
    },
    {
      [ExpenseItemKey.ID]: 5,
      [ExpenseItemKey.TIMESTAMP]: 1706534400000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.CANCELLED,
      [ExpenseItemKey.CATEGORY]: CategoryType.HOME,
      [ExpenseItemKey.DESCRIPTION]: 'Desk lamp order',
      [ExpenseItemKey.TOTAL]: 34.5,
    },
    {
      [ExpenseItemKey.ID]: 6,
      [ExpenseItemKey.TIMESTAMP]: 1706620800000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
      [ExpenseItemKey.DESCRIPTION]: 'Coffee and pastry',
      [ExpenseItemKey.TOTAL]: 7.85,
    },
    {
      [ExpenseItemKey.ID]: 7,
      [ExpenseItemKey.TIMESTAMP]: 1706707200000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PENDING,
      [ExpenseItemKey.CATEGORY]: CategoryType.CLOTHING,
      [ExpenseItemKey.DESCRIPTION]: 'Winter gloves',
      [ExpenseItemKey.TOTAL]: 25.0,
    },
    {
      [ExpenseItemKey.ID]: 8,
      [ExpenseItemKey.TIMESTAMP]: 1706793600000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.HOME,
      [ExpenseItemKey.DESCRIPTION]: 'Replacement light bulbs',
      [ExpenseItemKey.TOTAL]: 16.78,
    },
    {
      [ExpenseItemKey.ID]: 9,
      [ExpenseItemKey.TIMESTAMP]: 1706880000000,
      [ExpenseItemKey.STATUS]: ExpenseStatus.PAID,
      [ExpenseItemKey.CATEGORY]: CategoryType.FOOD,
      [ExpenseItemKey.DESCRIPTION]: 'Takeout dinner',
      [ExpenseItemKey.TOTAL]: 24.6,
    },
  ];

  /**
   * @summary - Render mobile components based on this state.
   *
   * @type {boolean}
   *
   * @public
   */
  public isMobile: boolean = false;

  private readonly _mediaQueryService: MediaQueryService;
  private readonly _changeDetectorRef: ChangeDetectorRef;

  constructor(mediaQueryService: MediaQueryService, changeDetectorRef: ChangeDetectorRef) {
    this._mediaQueryService = mediaQueryService;
    this._changeDetectorRef = changeDetectorRef;
  }

  /**
   * @summary - Init the media query subscription.
   *
   * @returns {void}
   * @private
   */
  private _initMediaQuerySubscription(): void {
    this._mediaQueryService.mediaQuery('max', 'lg').subscribe({
      next: value => {
        this.isMobile = value;
        this._changeDetectorRef.markForCheck();
      },
    });
  }

  /**
   * @summary - Optimize loop fn.
   *
   * @param {number} _ - Not used.
   * @param {ExpenseItem} item - Iteration item.
   *
   * @public
   * @returns {number}
   */
  public trackByFnDataSource(_: number, item: ExpenseItem): number {
    return item[ExpenseItemKey.ID];
  }

  ngOnInit(): void {
    this._initMediaQuerySubscription();
  }
}
