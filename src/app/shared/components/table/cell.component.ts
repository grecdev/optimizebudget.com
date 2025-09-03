import { Directive, ElementRef, Inject, Input, TemplateRef } from '@angular/core';

import type { CellDef, TableRefElement } from './table.model';

/**
 * @summary - Base class for the cell, adds a classname that identifies the column it renders in.
 */
export class BaseCell {
  constructor(columnDef: ColumnDef, elementRef: ElementRef<TableRefElement>) {
    elementRef.nativeElement.classList.add(...columnDef.columnCssClassName);
  }
}

/**
 * @summary - Header cell template container.
 */
@Directive({
  selector: 'th[app-header-cell]',
  host: {
    class: 'app-header-cell',
    role: 'columnheader',
  },
})
export class HeaderCell extends BaseCell {
  constructor(...args: unknown[]);

  constructor(columnDef: ColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}

/**
 * @summary - Captures the template of a column's header cell as well as cell-specific properties.
 */
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

/**
 * @summary - Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[appColumnDef]',
})
export class ColumnDef {
  /**
   * Column definition class name
   *
   * @private
   */
  columnCssClassName: string[] = [];

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
    this.columnCssClassName.push(value);
  }
}
