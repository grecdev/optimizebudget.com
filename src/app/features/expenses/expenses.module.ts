import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { TrackerTableModule } from './tracker-table/tracker-table.module';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [CommonModule, ExpensesRoutingModule, TrackerTableModule],
})
export class ExpensesModule {}
