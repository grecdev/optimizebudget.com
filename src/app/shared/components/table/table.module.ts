import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { ColumnDef, HeaderCell, HeaderCellDef } from './cell.component';

@NgModule({
  declarations: [TableComponent, ColumnDef, HeaderCellDef, HeaderCell],
  imports: [CommonModule],
  exports: [TableComponent, ColumnDef, HeaderCellDef, HeaderCell],
})
export class TableModule {}
