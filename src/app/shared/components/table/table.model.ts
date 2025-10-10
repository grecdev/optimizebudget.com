import { TemplateRef, ViewContainerRef } from '@angular/core';

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

export type { ICellDef, TableRefElement, RowOutlet };
