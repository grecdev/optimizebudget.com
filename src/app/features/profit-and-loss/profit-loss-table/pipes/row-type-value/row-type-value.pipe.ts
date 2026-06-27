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
    [RowType.DIVIDER]: '',
  };

  /**
   * @summary - Show the appropiate textContent format.
   *
   * @param {GetRowTypeDictValueOptions["item"]} options.item - The `dataSource` item.
   * @param {GetRowTypeDictValueOptions["key"]}  options.key - Column key.
   *
   * @public
   * @returns {string}
   */
  transform(options: GetRowTypeDictValueOptions): string {
    const { item, key } = options;

    const CELL_ITEM_VALUE = item[key as keyof typeof item];

    if (!CELL_ITEM_VALUE) {
      return '';
    }

    return this._rowTypeDict[CELL_ITEM_VALUE as keyof typeof this._rowTypeDict];
  }
}
