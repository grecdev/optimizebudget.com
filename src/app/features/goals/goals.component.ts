import { Component, OnInit } from '@angular/core';

import { type GetDaysInMonthOptions } from './goals.model';

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

  private _currentDate: Date | null = null;

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
  }
}
