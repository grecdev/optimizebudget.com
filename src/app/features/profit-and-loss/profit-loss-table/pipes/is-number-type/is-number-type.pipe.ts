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
   * @param {IsNumberTypeOptions["item"]} options.item - The `dataSource` item.
   * @param {IsNumberTypeOptions["key"]}  options.key - Column key.
   *
   * @public
   * @returns {boolean}
   */
  transform(options: IsNumberTypeOptions): boolean {
    const { item, key } = options;

    const CELL_ITEM_VALUE = item[key as keyof typeof item];

    const EXCLUDED_NUMBERS =
      item &&
      Object.hasOwn(item, 'type') &&
      [RowType.PROFIT_MARGINS].includes(item.type! as RowType);

    return !EXCLUDED_NUMBERS && typeof CELL_ITEM_VALUE === 'number';
  }
}
