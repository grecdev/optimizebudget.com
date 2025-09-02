import { TemplateRef } from '@angular/core';

type TemplateRefElement =
  | HTMLTableElement
  | HTMLTableColElement
  | HTMLTableRowElement
  | HTMLTableCellElement;

interface CellDef {
  template: TemplateRef<TemplateRefElement>;
}

export type { CellDef };
