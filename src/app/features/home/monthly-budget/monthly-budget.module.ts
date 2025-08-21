import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { MonthlyBudgetComponent } from './monthly-budget.component';

@NgModule({
  declarations: [MonthlyBudgetComponent],
  imports: [CommonModule, WidgetBoxModule],
  exports: [MonthlyBudgetComponent],
})
export class MonthlyBudgetModule {}
