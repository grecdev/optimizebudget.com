import { TemplateRef } from '@angular/core';

type TableRefElement =
  | HTMLTableElement
  | HTMLTableColElement
  | HTMLTableRowElement
  | HTMLTableCellElement;

interface ICellDef {
  template: TemplateRef<TableRefElement>;
}

export type { ICellDef, TableRefElement };
