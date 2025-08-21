import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { TotalBalanceModule } from './total-balance/total-balance.module';
import { MonthlyBudgetModule } from './monthly-budget/monthly-budget.module';
import { RemainingBudgetModule } from './remaining-budget/remaining-budget.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    WidgetBoxModule,
    TotalBalanceModule,
    MonthlyBudgetModule,
    RemainingBudgetModule,
  ],
})
export class HomeModule {}
