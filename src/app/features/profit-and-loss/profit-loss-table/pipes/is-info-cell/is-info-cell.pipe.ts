import { Pipe, PipeTransform } from '@angular/core';

import { type IsInfoCellOptions } from './is-info-cell.pipe.model';

@Pipe({
  name: 'isInfoCell',
})
export class IsInfoCellPipe implements PipeTransform {
  /**
   * @summary - Cell that displays some sort of "Info" text.
   *
   * @param {IsInfoCellOptions["item"]}  options.item - Actual item object data.
   * @param {IsInfoCellOptions["key"]}  options.key - Column key.
   *
   * @public
   * @returns {boolean}
   */
  transform(options: IsInfoCellOptions): boolean {
    const { item, key } = options;

    const CELL_ITEM_VALUE = item[key as keyof typeof item];

    return ['type', 'yearlyTotal'].includes(key) && typeof CELL_ITEM_VALUE !== 'number';
  }
}
