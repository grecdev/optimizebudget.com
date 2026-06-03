import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {
  type DataSource,
  type DataSourceItem,
  DataSourceItemKey,
  type GetDaysInMonthOptions,
  type GetFirstWeekDayOptions,
  type GetLastWeekDayOptions,
} from './grid-calendar.model';

@Component({
  selector: 'app-grid-calendar',
  templateUrl: './grid-calendar.component.html',
  styleUrls: ['./grid-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridCalendarComponent implements OnInit {
  /**
   * @summary - Current date.
   *
   * @type {Date | null}
   *
   * @public
   * @readonly
   */
  public readonly currentDate: Date | null = null;

  /**
   * @summary - An array containing all the days in given month.
   *
   * Basically, what we create our grid on.
   *
   * @type {DataSource}
   *
   * @public
   */
  public dataSource: DataSource = [];

  /**
   * @summary - So I can access it in the template.
   *
   * @type {DataSourceItemKey}
   *
   * @public
   * @readonly
   */
  public readonly DataSourceItemKey: typeof DataSourceItemKey = DataSourceItemKey;

  /**
   * @summary - How many days are in a week, with or without weekends.
   *
   * @type {number}
   *
   * @private
   */
  private readonly _totalDaysInWeek: number = 7;

  /**
   * @summary - Zero-based indexing representing the first day of the week.
   *
   * @type {number}
   *
   * @private
   */
  private readonly _firstWeekDayIndex: number = 0;

  /**
   * @summary - Zero-based indexing representing the last day of the week.
   *
   * Which is calculated based on how many week days you want to have.
   *
   * @type {number}
   *
   * @private
   */
  private readonly _lastWeekDayIndex: number = -1;

  /**
   * @summary - The first day of the given month.
   *
   * It should be Monday.
   *
   * @type {number}
   *
   * @private
   */
  private _firstWeekDay: number = -1;

  /**
   * @summary - The last day of the given month.
   *
   * @type {number}
   *
   * @private
   */
  private _lastWeekDay: number = -1;

  /**
   * @summary - Remaining days before the month, if any.
   *
   * @type {number}
   *
   * @private
   */
  private _remainingDaysBeforeMonth: number = -1;

  /**
   * @summary - Remaining days after the month, if any.
   *
   * @type {number}
   *
   * @private
   */
  private _remainingDaysAfterMonth: number = -1;

  constructor() {
    this.currentDate = new Date();

    this._lastWeekDayIndex = this._totalDaysInWeek - 1;
  }

  /**
   * @summary - For an optimized loop block.
   *
   * @param {number} [_index] - Current index.
   * @param {DataSourceItem} item - Current item in iteration.
   *
   * @returns {number}
   * @public
   */
  public trackByFnDataSource(_index: number, item: DataSourceItem): number {
    return item[DataSourceItemKey.ID];
  }

  /**
   * @summary - For an optimized loop block.
   *
   * @param {number} [_index] - Current index.
   * @param {string} item - Current item in iteration.
   *
   * @returns {string}
   * @public
   */
  public trackByFnDaysOfWeek(_index: number, item: string): string {
    return item;
  }

  /**
   * @summary - Get total days in given month and year.
   *
   * @param {GetDaysInMonthOptions["month"]} options.month - Target month, index based 0 (e.g.: January = 0).
   * @param {GetDaysInMonthOptions["year"]} options.year - Target year.
   *
   * @private
   * @returns {number}
   */
  private _getDaysInMonth(options: GetDaysInMonthOptions): number {
    const { month, year } = options;

    // Get day 0 of target month
    // If target month is June, then get the last day of previous month (May).
    const TOTAL_DAYS = new Date(year, month + 1, 0).getDate();

    return TOTAL_DAYS;
  }

  /**
   * @summary - Get first day of the month.
   *
   * First day is Monday, always....
   *
   * @param {GetFirstWeekDayOptions["month"]} options.month - Target month, index based 0 (e.g.: January = 0).
   * @param {GetFirstWeekDayOptions["year"]} options.year - Target year.
   *
   * @private
   * @returns {void}
   */
  private _getFirstWeekDay(options: GetFirstWeekDayOptions): void {
    const { month, year } = options;

    const FIRST_DAY = new Date(year, month, 1).getDay();
    const LAST_DAY_INDEX = this._totalDaysInWeek - 1;

    this._firstWeekDay = (FIRST_DAY + LAST_DAY_INDEX) % this._totalDaysInWeek;
  }

  /**
   * @summary - Get last day of the month.
   *
   * @param {GetLastWeekDayOptions["month"]} options.month - Target month, index based 0 (e.g.: January = 0).
   * @param {GetLastWeekDayOptions["year"]} options.year - Target year.
   *
   * @private
   * @returns {void}
   */
  private _getLastWeekDay(options: GetLastWeekDayOptions): void {
    const { month, year } = options;

    const LAST_DAY = new Date(year, month + 1, 0).getDay();
    const LAST_DAY_INDEX = this._totalDaysInWeek - 1;

    this._lastWeekDay = (LAST_DAY + LAST_DAY_INDEX) % this._totalDaysInWeek;
  }

  /**
   * @summary - Set the remaining days before the current month.
   *
   * @private
   * @returns {void}
   */
  private _setBeforeRemainingDays(): void {
    if (!this.currentDate) {
      throw Error('Current date not found!');
    }

    const TARGET_MONTH = this.currentDate.getMonth() - 1;
    const TARGET_YEAR = this.currentDate.getFullYear();

    const TOTAL_MONTH_DAYS = this._getDaysInMonth({
      month: TARGET_MONTH,
      year: TARGET_YEAR,
    });

    if (this._firstWeekDay === this._firstWeekDayIndex) {
      this._remainingDaysBeforeMonth = 0;
    } else {
      this._remainingDaysBeforeMonth = this._firstWeekDay - 1;
    }

    for (
      let i = TOTAL_MONTH_DAYS - this._remainingDaysBeforeMonth;
      i <= TOTAL_MONTH_DAYS && this._remainingDaysBeforeMonth > 0;
      i++
    ) {
      const ID: number = this.dataSource.length;

      const ITEM: DataSourceItem = {
        [DataSourceItemKey.ID]: ID,
        [DataSourceItemKey.DAY]: i,
      };

      this.dataSource.push(ITEM);
    }
  }

  /**
   * @summary - Set the days for the current month.
   *
   * @private
   * @returns {void}
   */
  private _setDaysInCurrentMonth(): void {
    if (!this.currentDate) {
      throw Error('Current date not found!');
    }

    const TARGET_MONTH = this.currentDate.getMonth();
    const CURRENT_YEAR = this.currentDate.getFullYear();

    const TOTAL_MONTH_DAYS = this._getDaysInMonth({
      month: TARGET_MONTH,
      year: CURRENT_YEAR,
    });

    for (let i = 1; i <= TOTAL_MONTH_DAYS; i++) {
      const ID: number = this.dataSource.length;

      const ITEM: DataSourceItem = {
        [DataSourceItemKey.ID]: ID,
        [DataSourceItemKey.DAY]: i,
      };

      this.dataSource.push(ITEM);
    }
  }

  /**
   * @summary - Set the remaining days after the current month.
   *
   * @private
   * @returns {void}
   */
  private _setAfterRemainingDays(): void {
    if (!this.currentDate) {
      throw Error('Current date not found!');
    }

    if (this._lastWeekDay === this._lastWeekDayIndex) {
      this._remainingDaysAfterMonth = 0;
    } else {
      this._remainingDaysAfterMonth = this._lastWeekDayIndex - this._lastWeekDay;
    }

    for (let i = 1; i <= this._remainingDaysAfterMonth && this._remainingDaysAfterMonth > 0; i++) {
      const ID: number = this.dataSource.length;

      const ITEM: DataSourceItem = {
        [DataSourceItemKey.ID]: ID,
        [DataSourceItemKey.DAY]: i,
      };

      this.dataSource.push(ITEM);
    }
  }

  ngOnInit() {
    if (!this.currentDate) {
      throw Error('Current date not found!');
    }

    const CURRENT_MONTH = this.currentDate.getMonth();
    const CURRENT_YEAR = this.currentDate.getFullYear();

    this._getFirstWeekDay({
      month: CURRENT_MONTH,
      year: CURRENT_YEAR,
    });

    this._getLastWeekDay({
      month: CURRENT_MONTH,
      year: CURRENT_YEAR,
    });

    this._setBeforeRemainingDays();
    this._setDaysInCurrentMonth();
    this._setAfterRemainingDays();
  }
}
