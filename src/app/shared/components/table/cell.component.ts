import { ContentChild, Directive, ElementRef, Inject, Input, TemplateRef } from '@angular/core';

import { TABLE } from './tokens';

import type { ICellDef, TableRefElement } from './table.model';
import { AppTableComponent } from './table.component';

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
  constructor(...args: Array<unknown>);

  constructor(columnDef: ColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);
  }
}

/**
 * @summary - Cell template container that adds the right classes and role.
 */
@Directive({
  selector: 'app-cell, td[app-cell]',
  host: {
    class: 'app-cell',
  },
})
export class Cell extends BaseCell {
  constructor(...args: Array<unknown>);

  constructor(columnDef: ColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);

    const CELL_ROLE = columnDef.table.getCellRole();

    if (CELL_ROLE) {
      elementRef.nativeElement.setAttribute('role', CELL_ROLE);
    }
  }
}

/**
 * @summary - Footer Cell template container that adds the right classes and role.
 */
@Directive({
  selector: 'app-footer-cell, td[app-footer-cell]',
  host: {
    class: 'app-footer-cell',
  },
})
export class FooterCell extends BaseCell {
  constructor(...args: Array<unknown>);

  constructor(columnDef: ColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);

    const CELL_ROLE = columnDef.table.getCellRole();

    if (CELL_ROLE) {
      elementRef.nativeElement.setAttribute('role', CELL_ROLE);
    }
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

  constructor(...args: Array<unknown>);
  constructor(@Inject(TemplateRef) template: CellDef['template']) {
    this.template = template;
  }
}

/**
 * @summary - Captures the template of a column's header cell as well as cell-specific properties.
 */
@Directive({
  selector: '[appCellDef]',
})
export class CellDef implements ICellDef {
  template: ICellDef['template'];

  constructor(...args: Array<unknown>);
  constructor(@Inject(TemplateRef) template: ICellDef['template']) {
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
  public table: AppTableComponent<unknown>;
  /**
   * Column definition class name
   *
   * @public
   */
  public columnCssClassName: string[] = [];

  /**
   * Unique column definition name
   *
   * @public
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

  @ContentChild(HeaderCellDef) headerCellDef: HeaderCellDef | null = null;
  @ContentChild(CellDef) cellDef: CellDef | null = null;

  constructor(...args: Array<unknown>);
  constructor(@Inject(TABLE) table: AppTableComponent<unknown>) {
    this.table = table;
  }

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
