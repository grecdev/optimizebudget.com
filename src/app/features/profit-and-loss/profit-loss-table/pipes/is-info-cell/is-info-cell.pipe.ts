import { Pipe, PipeTransform } from '@angular/core';

import { type IsInfoCellOptions } from './is-info-cell.pipe.model';

@Pipe({
  name: 'isInfoCell',
})
export class IsInfoCellPipe implements PipeTransform {
  /**
   * @summary - Cell that displays some sort of "Info" text.
   *
   * @param {IsInfoCellOptions["displayedColumnsItem"]}  options.displayedColumnsItem - Column key.
   *
   * @public
   * @returns {boolean}
   */
  transform(options: IsInfoCellOptions): boolean {
    const { cellItem, displayedColumnsItem } = options;

    const CELL_ITEM_VALUE = cellItem[displayedColumnsItem as keyof typeof cellItem];

    return (
      ['type', 'yearlyTotal'].includes(displayedColumnsItem) && typeof CELL_ITEM_VALUE !== 'number'
    );
  }
}
