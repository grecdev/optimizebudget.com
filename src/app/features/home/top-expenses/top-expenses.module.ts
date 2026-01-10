import { NgModule } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';
import { AppTableModule } from '@shared/components/table/table.module';

import { TopExpensesComponent } from './top-expenses.component';

@NgModule({
  declarations: [TopExpensesComponent],
  imports: [WidgetBoxModule, AppTableModule, DatePipe, CurrencyPipe],
  exports: [TopExpensesComponent],
})
export class TopExpensesModule {}
