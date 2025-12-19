import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewContainerRef,
  ViewEncapsulation,
  OnDestroy,
  TemplateRef,
  IterableDiffers,
  IterableDiffer,
  OnChanges,
  SimpleChanges,
  IterableChanges,
  ElementRef,
  Inject,
} from '@angular/core';

import { TableRefElement, RowOutlet } from './table.model';
import { TABLE } from './tokens';

import { TableComponent } from './table.component';
import { CellDef, ColumnDef } from './cell.component';

const ROW_TEMPLATE = '<ng-container cellOutlet></ng-container>';

@Directive({
  selector: '[headerRowOutlet]',
})
export class HeaderRowOutlet implements RowOutlet {
  viewContainer: ViewContainerRef;
  elementRef: ElementRef;

  constructor(...args: Array<unknown>);

  constructor(
    viewContainer: ViewContainerRef,
    elementRef: ElementRef,
    @Inject(TABLE) table: TableComponent<unknown>
  ) {
    this.viewContainer = viewContainer;
    this.elementRef = elementRef;

    table.headerRowOutlet = this;
    table.outletAssigned();
  }
}

/**
 * @summary - Provides a handle for the table to grab the
 * view container's `ng-container` to insert data rows
 */
@Directive({
  selector: '[rowOutlet]',
})
export class DataRowOutlet implements RowOutlet {
  viewContainer: ViewContainerRef;
  elementRef: ElementRef;

  constructor(...args: Array<unknown>);

  constructor(
    viewContainerRef: ViewContainerRef,
    elementRef: ElementRef,
    @Inject(TABLE) table: TableComponent<unknown>
  ) {
    this.viewContainer = viewContainerRef;
    this.elementRef = elementRef;

    table.rowOutlet = this;
    table.outletAssigned();
  }
}

/**
 * Outlet for rendering cells inside a row.
 */
@Directive({
  selector: '[cellOutlet]',
})
export class CellOutlet implements OnDestroy {
  public readonly viewContainerRef: ViewContainerRef;

  cells: CellDef[] = [];

  context: any;

  /**
   * Static property used to assign a reference to the last embedded element in the view.
   *
   * Contains the latest constructed instance of this class.
   *
   * When the rows (Row, HeaderRow) are creating using the createEmbeddedView method,
   * this property will provide a handle that provide the component's cell and context.
   *
   * After the initialization the cell outlet will construct the cells with the provided context.
   */
  public static mostRecentCellOutlet: CellOutlet | null = null;

  constructor(...args: Array<unknown>);

  constructor(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;

    CellOutlet.mostRecentCellOutlet = this;
  }

  ngOnDestroy() {
    /**
     * If this was the last CellOutlet being rendered in the view, remove its reference
     * from the static property after it has been destroyed, to avoid leaking memory.
     */
    if (CellOutlet.mostRecentCellOutlet === this) {
      CellOutlet.mostRecentCellOutlet = null;
    }
  }
}

/**
 * Header template component that contains the cell outlet.
 */
@Component({
  selector: 'tr[app-header-row]',
  template: ROW_TEMPLATE,
  host: {
    class: 'app-header-row',
    role: 'row',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderRow {}

/**
 * Base class for row definitions to check columns inputs for changes and notifying the table.
 */
@Directive()
export class BaseRowDef implements OnChanges {
  template: TemplateRef<TableRefElement>;
  protected _differs: IterableDiffers;

  /**
   * The columns that will be displayed in this row.
   */
  columns: Iterable<string> = [];

  protected _columnsDiffer: IterableDiffer<any> | null = null;

  constructor(...args: Array<unknown>);
  constructor(template: TemplateRef<TableRefElement>, differs: IterableDiffers) {
    this.template = template;
    this._differs = differs;
  }

  ngOnChanges(changes: SimpleChanges) {
    /**
     * Create a differ if one does not yet exist.
     * Initialize based on the initial value of the columns property or an empty array if none is provided.
     */
    if (!this._columnsDiffer) {
      const columns = (changes['columns'] && changes['columns'].currentValue) || [];
      this._columnsDiffer = this._differs.find(columns).create();
      this._columnsDiffer.diff(columns);
    }
  }

  getColumnsDiff(): IterableChanges<any> | null {
    if (!this._columnsDiffer) {
      return null;
    }

    return this._columnsDiffer.diff(this.columns);
  }

  extractCellTemplate(column: ColumnDef): TemplateRef<TableRefElement> | null {
    if (this instanceof HeaderRowDef && column.headerCellDef) {
      return column.headerCellDef.template;
    }

    return column.cellDef && column.cellDef.template;
  }
}

/**
 * @summary - Header row definition for our table component.
 *
 * Captures the header row's template and other header properties such as
 * the columns to display.
 */
@Directive({
  selector: '[appHeaderRowDef]',
  inputs: [
    {
      name: 'columns',
      alias: 'appHeaderRowDef',
    },
  ],
})
export class HeaderRowDef<T> extends BaseRowDef implements OnChanges {
  constructor(...args: Array<unknown>);
  constructor(
    templateRef: TemplateRef<TableRefElement>,
    iterableDiffers: IterableDiffers,
    @Inject(TABLE) table: TableComponent<TableRefElement>
  ) {
    super(templateRef, iterableDiffers);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
}

/**
 * @summary - Data row definition for our table.
 *
 * Captures the row's template and other row properties such as
 * the columns to display and a `when` predicate that describes when this row should be used.
 */
@Directive({
  selector: '[appRowDef]',
  inputs: [
    {
      name: 'columns',
      alias: 'rowDefColumns',
    },
    {
      name: 'when',
      alias: 'rowDefWhen',
    },
  ],
})
export class RowDef<T> extends BaseRowDef {
  /**
   * @summary - Function that should return true if  this row should be used
   * for the provided index and row data.
   *
   * If left undefined, this row will be considered the default row template to use
   * when no other `when` functions returns true for the data.
   *
   * For every row, there must be at least one `when` function that passes or returns undefined (default).
   */
  when: ((rowData: T, index: number) => boolean) | undefined;

  constructor(...args: Array<unknown>);

  constructor(
    templateRef: TemplateRef<TableRefElement>,
    iterableDiffers: IterableDiffers,
    @Inject(TABLE) table: TableComponent<TableRefElement>
  ) {
    super(templateRef, iterableDiffers);
  }
}

/**
 * @summary - Footer row definition for our table component.
 *
 * Captures the footer row's template and other footer properties such as
 * the columns to display.
 */
@Directive({
  selector: '[appFooterRowDef]',
  inputs: [
    {
      name: 'columns',
      alias: 'appFooterRowDef',
    },
  ],
})
export class FooterRowDef<T> extends BaseRowDef implements OnChanges {
  constructor(...args: Array<unknown>);
  constructor(
    templateRef: TemplateRef<TableRefElement>,
    iterableDiffers: IterableDiffers,
    @Inject(TABLE) table: TableComponent<TableRefElement>
  ) {
    super(templateRef, iterableDiffers);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
}
