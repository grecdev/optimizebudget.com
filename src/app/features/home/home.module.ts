import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { TotalBalanceModule } from './total-balance/total-balance.module';
import { MonthlyBudgetModule } from './monthly-budget/monthly-budget.module';
import { RemainingBudgetModule } from './remaining-budget/remaining-budget.module';
import { TopExpensesModule } from './top-expenses/top-expenses.module';
import { CategoryExpensesModule } from './category-expenses/category-expenses.module';
import { MoneyStatisticsModule } from './money-statistics/money-statistics.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TotalBalanceModule,
    MonthlyBudgetModule,
    RemainingBudgetModule,
    TopExpensesModule,
    CategoryExpensesModule,
    MoneyStatisticsModule,
  ],
})
export class HomeModule {}
