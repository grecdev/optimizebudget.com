import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { CellDef, ColumnDef, HeaderCell, HeaderCellDef } from './cell.component';
import { CellOutlet, HeaderRow, HeaderRowDef } from './row.component';

@NgModule({
  declarations: [
    TableComponent,
    HeaderRow,
    HeaderCell,
    CellOutlet,
    //
    HeaderRowDef,
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
    CellDef,
    ColumnDef,
    HeaderCellDef,
  ],
})
export class TableModule {}
