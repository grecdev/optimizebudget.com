import { TemplateRef } from '@angular/core';

type TableRefElement =
  | HTMLTableElement
  | HTMLTableColElement
  | HTMLTableRowElement
  | HTMLTableCellElement;

interface CellDef {
  template: TemplateRef<TableRefElement>;
}

export type { CellDef, TableRefElement };
