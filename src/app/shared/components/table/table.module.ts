import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { HeaderCell, Cell, FooterCell, HeaderCellDef, CellDef, ColumnDef } from './cell.component';

import {
  CellOutlet,
  DataRowOutlet,
  HeaderRow,
  HeaderRowDef,
  HeaderRowOutlet,
  RowDef,
  FooterRowDef,
  FooterRowOutlet,
} from './row.component';

const DECLARATIONS = [
  TableComponent,
  HeaderRow,
  HeaderCell,
  Cell,
  FooterCell,
  HeaderRowDef,
  RowDef,
  FooterRowDef,
  CellDef,
  ColumnDef,
  HeaderCellDef,
];

@NgModule({
  declarations: [...DECLARATIONS, CellOutlet, HeaderRowOutlet, DataRowOutlet, FooterRowOutlet],
  imports: [CommonModule],
  exports: [...DECLARATIONS],
})
export class TableModule {}
