import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemainingBudgetModule } from '@shared/components/remaining-budget/remaining-budget.module';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { TrackerTableModule } from './tracker-table/tracker-table.module';
import { TotalMonthlySpentModule } from './total-monthly-spent/total-monthly-spent.module';
import { TotalCountCategoryModule } from './total-count-category/total-count-category.module';
import { IncomingPaymentsModule } from './incoming-payments/incoming-payments.module';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    // Angular specific
    CommonModule,
    // Global components
    RemainingBudgetModule,
    // Local components
    ExpensesRoutingModule,
    TrackerTableModule,
    TotalMonthlySpentModule,
    TotalCountCategoryModule,
    IncomingPaymentsModule,
  ],
})
export class ExpensesModule {}
