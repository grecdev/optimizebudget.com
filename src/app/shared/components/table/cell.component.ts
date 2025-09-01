import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appColumnDef]',
})
export class ColumnDef {
  /**
   * Column definition class name
   *
   * @private
   */
  private _columnCssClassName: string[] = [];

  /**
   * Unique column definition name
   *
   * @private
   */
  @Input('appColumnDef') get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (value) {
      this._name = value;

      const formattedValue = value.replace(/[^a-z0-9_-]/gi, '-');
      const columnClassName = `app-table-column-${formattedValue}`;

      this._updateColumnCssClassName(columnClassName);
    }
  }

  private _name: string = '';

  /**
   * @summary - Create the column class definition class name
   *
   * @param {string} value - The class name you want to add in array
   *
   * @private
   * @returns {void}
   */
  private _updateColumnCssClassName(value: string) {
    this._columnCssClassName.push(value);
  }
}
