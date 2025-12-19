import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { CellDef, ColumnDef, HeaderCell, HeaderCellDef } from './cell.component';

import {
  CellOutlet,
  DataRowOutlet,
  HeaderRow,
  HeaderRowDef,
  HeaderRowOutlet,
  RowDef,
  FooterRowDef,
} from './row.component';

@NgModule({
  declarations: [
    TableComponent,
    HeaderRow,
    HeaderCell,
    CellOutlet,
    HeaderRowOutlet,
    DataRowOutlet,
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
