import { Pipe, PipeTransform } from '@angular/core';

import { type IsProfitMarginOptions } from './is-profit-margin.pipe.model';
import { RowType } from '@features/profit-and-loss/profit-loss-table/profit-loss-table.model';

@Pipe({
  name: 'isProfitMargin',
})
export class IsProfitMarginPipe implements PipeTransform {
  /**
   * @summary - Check if the current item is a profit margin number, so I can use the percentage sign.
   *
   * @param {IsNumberTypeOptions["cellItem"]} options.cellItem - The `dataSource` item.
   * @param {IsNumberTypeOptions["displayedColumnsItem"]}  options.displayedColumnsItem - Column key.
   *
   * @public
   * @returns {boolean}
   */
  transform(options: IsProfitMarginOptions): boolean {
    const { cellItem, displayedColumnsItem } = options;

    const CELL_ITEM_VALUE = cellItem[displayedColumnsItem as keyof typeof cellItem];

    const IS_PROFIT_MARGIN =
      cellItem &&
      Object.hasOwn(cellItem, 'type') &&
      [RowType.PROFIT_MARGINS].includes(cellItem.type! as RowType) &&
      typeof CELL_ITEM_VALUE === 'number';

    return IS_PROFIT_MARGIN;
  }
}
