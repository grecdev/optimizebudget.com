import { Pipe, PipeTransform } from '@angular/core';

import { RowType } from '@features/profit-and-loss/profit-loss-table/profit-loss-table.model';

import { type GetRowTypeDictValueOptions } from './row-type-value.pipe.model';

@Pipe({
  name: 'rowTypeValue',
})
export class RowTypeValuePipe implements PipeTransform {
  /**
   * @summary - Used for the table cell's text content.
   *
   * @type {Record<RowType, string>}
   *
   * @private
   * @readonly
   */
  private readonly _rowTypeDict: Record<RowType, string> = {
    [RowType.REVENUE]: 'Revenue',
    [RowType.EXPENSES]: 'Expenses',
    [RowType.GROSS_PROFIT]: 'Gross Profit',
    [RowType.PROFIT_MARGINS]: 'Profit Margins',
  };

  /**
   * @summary - Show the appropiate textContent format.
   *
   * @param {GetRowTypeDictValueOptions["cellItem"]} options.cellItem - The `dataSource` item.
   * @param {GetRowTypeDictValueOptions["displayedColumnsItem"]}  options.displayedColumnsItem - Column key.
   *
   * @public
   * @returns {string}
   */
  transform(options: GetRowTypeDictValueOptions): string {
    const { cellItem, displayedColumnsItem } = options;

    const CELL_ITEM_VALUE = cellItem[displayedColumnsItem as keyof typeof cellItem];

    if (!CELL_ITEM_VALUE) {
      return 'none';
    }

    return this._rowTypeDict[CELL_ITEM_VALUE as keyof typeof this._rowTypeDict];
  }
}
