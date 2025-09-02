import { Directive, Inject, Input, TemplateRef } from '@angular/core';

import type { CellDef } from './table.model';

@Directive({
  selector: '[appHeaderCellDef]',
})
export class HeaderCellDef implements CellDef {
  template: CellDef['template'];

  constructor(...args: unknown[]);
  constructor(@Inject(TemplateRef) template: CellDef['template']) {
    this.template = template;
  }
}

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

  // @ContentChild(HeaderCellDef) headerCellDef: HeaderCellDef | undefined;

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
