import { TemplateRef, ViewContainerRef } from '@angular/core';

import { RowDef } from '@shared/components/table/row.component';

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
  RowDef: RowDef<T>;
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

export type { ICellDef, TableRefElement, RowOutlet, RenderRow, RowContext };
