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

@NgModule({
  declarations: [
    TableComponent,
    HeaderRow,
    HeaderCell,
    Cell,
    FooterCell,
    CellOutlet,
    HeaderRowOutlet,
    DataRowOutlet,
    FooterRowOutlet,
    //
    HeaderRowDef,
    RowDef,
    FooterRowDef,
    CellDef,
    ColumnDef,
    HeaderCellDef,
  ],
  imports: [CommonModule],
  exports: [
    TableComponent,
    HeaderRow,
    HeaderCell,
    Cell,
    FooterCell,
    //
    HeaderRowDef,
    RowDef,
    FooterRowDef,
    CellDef,
    ColumnDef,
    HeaderCellDef,
  ],
})
export class TableModule {}
