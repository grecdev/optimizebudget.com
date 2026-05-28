import { Component, OnInit } from '@angular/core';

import { type GetDaysInMonthOptions, type GetFirstDayOfMonthOptions } from './goals.model';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
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
   * @type {number}
   *
   * @private
   */
  private _firstDayOfMonth: number = -1;

  /**
   * @summary - Current date.
   *
   * @type {Date | null}
   *
   * @private
   */
  private readonly _currentDate: Date | null = null;

  constructor() {
    this._currentDate = new Date();
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

    const TOTAL_DAYS = new Date(month, year, 0).getDate();

    this._totalDaysInMonth = TOTAL_DAYS;
  }

  /**
   * @summary - Get total days in given month and year.
   *
   * @param {GetFirstDayOfMonthOptions["month"]} options.month - Target month, index based 0 (e.g.: January = 0).
   * @param {GetFirstDayOfMonthOptions["year"]} options.year - Target year.
   *
   * @private
   * @returns {void}
   */
  private _getFirstDayOfMonth(options: GetFirstDayOfMonthOptions): void {
    const { month, year } = options;

    const FIRST_DAY = new Date(year, month, 1).getDay();

    this._firstDayOfMonth = FIRST_DAY;
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

    this._getFirstDayOfMonth({
      month: CURRENT_MONTH,
      year: CURRENT_YEAR,
    });

    const tst = ['duminica', 'luni', 'marti', 'miercuri', 'joi', 'vineri', 'sambata'];

    console.log(tst[this._firstDayOfMonth]);
  }
}
