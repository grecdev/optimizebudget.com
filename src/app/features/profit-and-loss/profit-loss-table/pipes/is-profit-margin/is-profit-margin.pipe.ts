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
   * @param {IsNumberTypeOptions["item"]} options.item - The `dataSource` item.
   * @param {IsNumberTypeOptions["key"]}  options.key - Column key.
   *
   * @public
   * @returns {boolean}
   */
  transform(options: IsProfitMarginOptions): boolean {
    const { item, key } = options;

    const CELL_ITEM_VALUE = item[key as keyof typeof item];

    const IS_PROFIT_MARGIN =
      item &&
      Object.hasOwn(item, 'type') &&
      [RowType.PROFIT_MARGINS].includes(item.type! as RowType) &&
      typeof CELL_ITEM_VALUE === 'number';

    return IS_PROFIT_MARGIN;
  }
}
