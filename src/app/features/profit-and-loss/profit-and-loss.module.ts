import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitAndLossRoutingModule } from './profit-and-loss-routing.module';
import { ProfitAndLossComponent } from './profit-and-loss.component';

import { RevenueModule } from './revenue/revenue.module';
import { ExpensesModule } from './expenses/expenses.module';

@NgModule({
  declarations: [ProfitAndLossComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    ProfitAndLossRoutingModule,
    RevenueModule,
    ExpensesModule,
  ],
})
export class ProfitAndLossModule {}
