import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { ColumnDef } from './cell.component';

@NgModule({
  declarations: [TableComponent, ColumnDef],
  imports: [CommonModule],
  exports: [TableComponent, ColumnDef],
})
export class TableModule {}
