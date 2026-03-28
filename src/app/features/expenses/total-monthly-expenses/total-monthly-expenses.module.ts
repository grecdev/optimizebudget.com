import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { TotalMonthlyExpensesComponent } from './total-monthly-expenses.component';

@NgModule({
  declarations: [TotalMonthlyExpensesComponent],
  imports: [
    CommonModule,
    CurrencyPipe,
    DecimalPipe,
    //
    WidgetBoxModule,
  ],
  exports: [TotalMonthlyExpensesComponent],
})
export class TotalMonthlyExpensesModule {}
