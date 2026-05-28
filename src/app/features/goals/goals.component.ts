import { Component, OnInit } from '@angular/core';

import {
  type GetDaysInMonthOptions,
  type GetFirstWeekDayOptions,
  type GetLastWeekDayOptions,
} from './goals.model';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  /**
   * @summary - Current date.
   *
   * @type {Date | null}
   *
   * @private
   */
  private readonly _currentDate: Date | null = null;

  /**
   * @summary - How many days are in a week, with or without weekends.
   *
   * @type {number}
   *
   * @private
   */
  private readonly _totalDaysInWeek = 7;

  /**
   * @summary - Index based-0 representing the last day of the week.
   *
   * @type {number}
   *
   * @private
   */
  private readonly _lastWeekDayIndex: number = -1;

  /**
   * @summary- Total days in a month.
   *
   * @type {number}
   *
   * @private
   */
  private _totalDaysInMonth: number = -1;

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
   * @summary - An array containing all the days in given month.
   *
   * @type {Array<number>}
   *
   * @private
   */
  private _calendarGridArray: Array<number> = [];

  /**
   * @summary - Remaining days to fill the grid, if any.
   *
   * @type {number}
   *
   * @private
   */
  private _gridRemainingDays: number = -1;

  constructor() {
    this._currentDate = new Date();
    this._lastWeekDayIndex = this._totalDaysInWeek - 1;
  }

  /**
   * @summary - Get total days in given month and year.
   *
   * @param {GetDaysInMonthOptions["month"]} options.month - Target month, index based 0 (e.g.: January = 0).
   * @param {GetDaysInMonthOptions["year"]} options.year - Target year.
   *
   * @private
   * @returns {void}
   */
  private _getDaysInMonth(options: GetDaysInMonthOptions): void {
    const { month, year } = options;

    // Get day 0 of target month
    // If target month is June, then get the last day of previous month (May).
    const TOTAL_DAYS = new Date(year, month + 1, 0).getDate();

    this._totalDaysInMonth = TOTAL_DAYS;
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
   * @summary - Get remaining days to fill the grid.
   *
   * @private
   * @returns {void}
   */
  private _getGridRemainingDays(): void {
    if (this._lastWeekDay === this._totalDaysInWeek) {
      this._gridRemainingDays = 0;
    } else {
      this._gridRemainingDays = this._lastWeekDayIndex - this._lastWeekDay;
    }
  }

  /**
   * @summary - Create the array with all days in given month.
   *
   * @private
   * @returns {void}
   */
  private _setCalendarGridArray(): void {
    // Fill it with the remaining days from previous month, up to the first day of current month.
    const GRID = Array(this._firstWeekDay).fill(null);

    // Days in current month.
    for (let i = 1; i <= this._totalDaysInMonth; i++) {
      GRID.push(i);
    }

    for (let i = 1; i <= this._gridRemainingDays; i++) {
      GRID.push(i);
    }

    this._calendarGridArray = GRID;
  }

  ngOnInit() {
    if (!this._currentDate) {
      throw Error('Current date not found!');
    }

    const CURRENT_MONTH = this._currentDate.getMonth();
    const CURRENT_YEAR = this._currentDate.getFullYear();

    this._getDaysInMonth({
      month: CURRENT_MONTH,
      year: CURRENT_YEAR,
    });

    this._getFirstWeekDay({
      month: CURRENT_MONTH,
      year: CURRENT_YEAR,
    });

    this._getLastWeekDay({
      month: CURRENT_MONTH,
      year: CURRENT_YEAR,
    });

    this._getGridRemainingDays();
    this._setCalendarGridArray();
  }
}
