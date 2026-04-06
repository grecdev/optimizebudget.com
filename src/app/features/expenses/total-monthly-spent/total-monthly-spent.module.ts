import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { TotalMonthlySpentComponent } from './total-monthly-spent.component';

@NgModule({
  declarations: [TotalMonthlySpentComponent],
  imports: [
    CommonModule,
    CurrencyPipe,
    DecimalPipe,
    //
    WidgetBoxModule,
  ],
  exports: [TotalMonthlySpentComponent],
})
export class TotalMonthlySpentModule {}
