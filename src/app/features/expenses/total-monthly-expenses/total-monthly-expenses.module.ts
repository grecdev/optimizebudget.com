import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { TotalMonthlyExpensesComponent } from './total-monthly-expenses.component';

@NgModule({
  declarations: [TotalMonthlyExpensesComponent],
  imports: [CommonModule, WidgetBoxModule],
  exports: [TotalMonthlyExpensesComponent],
})
export class TotalMonthlyExpensesModule {}
