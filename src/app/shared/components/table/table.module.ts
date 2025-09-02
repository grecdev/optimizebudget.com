import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { ColumnDef, HeaderCellDef } from './cell.component';

@NgModule({
  declarations: [TableComponent, ColumnDef, HeaderCellDef],
  imports: [CommonModule],
  exports: [TableComponent, ColumnDef, HeaderCellDef],
})
export class TableModule {}
