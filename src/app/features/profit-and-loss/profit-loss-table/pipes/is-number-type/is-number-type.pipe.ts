import { Pipe, PipeTransform } from '@angular/core';

import { RowType } from '@features/profit-and-loss/profit-loss-table/profit-loss-table.model';

import { type IsNumberTypeOptions } from './is-number-type-pipe.model';

@Pipe({
  name: 'isNumberType',
})
export class IsNumberTypePipe implements PipeTransform {
  /**
   * @summary - Check if the current item is a "usable" number, inside the template.
   *
   * @param {IsNumberTypeOptions["cellItem"]} options.cellItem - The `dataSource` item.
   * @param {IsNumberTypeOptions["displayedColumnsItem"]}  options.displayedColumnsItem - Column key.
   *
   * @public
   * @returns {boolean}
   */
  transform(options: IsNumberTypeOptions): boolean {
    const { cellItem, displayedColumnsItem } = options;

    const CELL_ITEM_VALUE = cellItem[displayedColumnsItem as keyof typeof cellItem];

    const EXCLUDED_NUMBERS =
      cellItem &&
      Object.hasOwn(cellItem, 'type') &&
      [RowType.PROFIT_MARGINS].includes(cellItem.type! as RowType);

    return !EXCLUDED_NUMBERS && typeof CELL_ITEM_VALUE === 'number';
  }
}
