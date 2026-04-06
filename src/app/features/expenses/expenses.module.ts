import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { TrackerTableModule } from './tracker-table/tracker-table.module';
import { TotalMonthlySpentModule } from './total-monthly-spent/total-monthly-spent.module';
import { TotalCountCategoryModule } from './total-count-category/total-count-category.module';
import { IncomingPaymentsModule } from './incoming-payments/incoming-payments.module';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    CommonModule,
    //
    ExpensesRoutingModule,
    TrackerTableModule,
    TotalMonthlySpentModule,
    TotalCountCategoryModule,
    IncomingPaymentsModule,
  ],
})
export class ExpensesModule {}
