import { Component } from '@angular/core';

import {
  Months,
  RowType,
  type DisplayedColumns,
  type DataSource,
  type DataSourceItem,
  type DataSourceMonths,
  type GetDataSourceItemOptions,
} from './profit-loss-table.model';

@Component({
  selector: 'app-profit-loss-table',
  templateUrl: './profit-loss-table.component.html',
  styleUrls: ['./profit-loss-table.component.scss'],
})
export class ProfitLossTableComponent {
  public readonly isNaN = isNaN;
  public readonly Months = Months;
  public displayedColumns: DisplayedColumns = [];

  private _dataSourceRevenue: DataSourceMonths = {
    [Months.JANUARY]: 12,
    [Months.FEBRUARY]: 11,
    [Months.MARCH]: 10,
    [Months.APRIL]: 9,
    [Months.MAY]: 8,
    [Months.JUNE]: 7,
    [Months.JULY]: 6,
    [Months.AUGUST]: 5,
    [Months.SEPTEMBER]: 4,
    [Months.OCTOBER]: 3,
    [Months.NOVEMBER]: 2,
    [Months.DECEMBER]: 1,
  };

  private _dataSourceExpenses: DataSourceMonths = {
    [Months.JANUARY]: 1,
    [Months.FEBRUARY]: 2,
    [Months.MARCH]: 3,
    [Months.APRIL]: 4,
    [Months.MAY]: 5,
    [Months.JUNE]: 6,
    [Months.JULY]: 7,
    [Months.AUGUST]: 8,
    [Months.SEPTEMBER]: 9,
    [Months.OCTOBER]: 10,
    [Months.NOVEMBER]: 11,
    [Months.DECEMBER]: 12,
  };

  public dataSource: DataSource = [];

  /**
   * @summary - Track by fn for displayed columns
   *
   * @param {number} _index - Current index.
   * @param {string} item - Current item in loop.
   *
   * @returns {string}
   * @public
   */
  public trackByFnDisplayedColumns(_index: number, item: string): string {
    return item;
  }

  /**
   * @summary - Format displayed columns.
   *
   * @private
   * @returns {void}
   */
  private _initDisplayedColumns(): void {
    const ALL_MONTHS = Object.values(this.Months);

    this.displayedColumns = ['type', ...ALL_MONTHS, 'yearlyTotal'];
  }

  /**
   * @summary - Format the final data source that will be used inside the template.
   *
   * @private
   * @returns {void}
   */
  private _initSetDataSource(): void {
    const REVENUE_DATA = this._getDataSourceItem({
      type: RowType.REVENUE,
      data: this._dataSourceRevenue,
    });

    const EXPENSES_DATA = this._getDataSourceItem({
      type: RowType.EXPENSES,
      data: this._dataSourceExpenses,
    });

    this.dataSource.push(REVENUE_DATA, EXPENSES_DATA);
  }

  /**
   * @summary - Basically calculate the data source item for revenue and expenses rows.
   *
   * @param {GetDataSourceItemOptions['type']} options.type - The row type.
   * @param {GetDataSourceItemOptions['data']} options.data - The month data.
   *
   * @private
   * @returns {DataSourceItem}
   */
  private _getDataSourceItem(options: GetDataSourceItemOptions): DataSourceItem {
    const { type, data } = options;

    const YEARLY_TOTAL = Object.values(data).reduce((total, current) => total + current, 0);

    const ITEM: DataSourceItem = {
      type,
      ...data,
      yearlyTotal: YEARLY_TOTAL,
    };

    return ITEM;
  }

  constructor() {
    this._initDisplayedColumns();
    this._initSetDataSource();
  }
}
