import { Pipe, PipeTransform } from '@angular/core';

import { type GetNumberValueOptions } from './get-number-value.pipe.model';

@Pipe({
  name: 'getNumberValue',
})
export class GetNumberValuePipe implements PipeTransform {
  /**
   * @summary - Show the appropiate textContent format.
   *
   * @param {GetRowTypeDictValueOptions["item"]} options.item - The `dataSource` item.
   * @param {GetRowTypeDictValueOptions["key"]}  options.key - Column key.
   *
   * @public
   * @returns {string}
   */
  transform(options: GetNumberValueOptions): number {
    const { item, key } = options;

    const VALUE = item[key as keyof typeof item];

    if (!VALUE || typeof VALUE !== 'number') {
      return -1;
    }

    return VALUE;
  }
}
