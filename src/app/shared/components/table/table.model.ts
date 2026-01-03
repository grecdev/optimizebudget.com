import { TemplateRef, ViewContainerRef } from '@angular/core';

import { type Observable } from 'rxjs';

import { FooterRowDef, HeaderRowDef, RowDef } from './row.component';
import { ColumnDef } from './cell.component';

type TableRefElement =
  | HTMLTableElement
  | HTMLTableColElement
  | HTMLTableRowElement
  | HTMLTableCellElement;

interface ICellDef {
  template: TemplateRef<TableRefElement>;
}

interface RowOutlet {
  viewContainer: ViewContainerRef;
}

/**
 * @summary - Set of properties that represents the identity of a single rendered row.
 *
 * When a table need to determine the list of rows to render, it will iterate through
 * each data object (data source) and evaluate its list of row templates to display.
 *
 * For each pair of data object and row template, a `RenderRow` is added to the list of rows
 * to render.
 *
 * If the pair of data object and row template has already been rendered, the previously used
 * `RenderRow` is added to the list, else a new one is created.
 *
 * Once the list is complete and all data objects has been iterated through a diff is performed
 * to determine the changes that need to be made to the rendered rows.
 */
interface RenderRow<T> {
  data: T;
  dataIndex: number;
  rowDef: RowDef<T>;
}

/**
 * @summary - Context provided to the row cells when `multipleTemplateDataRows` is false.
 */
interface RowContext<T> {
  // Data for the row this cell is located within.
  $implicit?: T;
  // Index of the data object in the provided data array.
  index?: number;
  // Length of the number of total rows.
  count?: number;
  // True if this cell is contained in the first row.
  first?: boolean;
  // True if this cell is contained in the last row.
  last?: boolean;
  // True if this cell is contained in a row with an even-numbered index.
  even?: boolean;
  // True if this cell is contained in a row with an odd-numbered index.
  odd?: boolean;
}

/**
 * @summary - Possible types that can be set as the data source.
 */
type TableDataSourceInput<T> = readonly T[] | Observable<T> | DataSource<T>;

/**
 * @summary - Query list content retrieved from @ContentChildren decorator.
 */
type QueryListDefs<T> = HeaderRowDef<T> | RowDef<T> | FooterRowDef<T> | ColumnDef;

interface ListRange {
  start: number;
  end: number;
}

/**
 * @summary - Interface for any component that provides a view of some data collection
 * and wants to provide information regarding the view and changes made.
 *
 * P.S: Maybe I need to move this outside the table component, idk for now.
 */
interface CollectionViewer {
  viewChange: Observable<ListRange>;
}

export type {
  ICellDef,
  TableRefElement,
  RowOutlet,
  RenderRow,
  RowContext,
  TableDataSourceInput,
  QueryListDefs,
  ListRange,
  CollectionViewer,
};
