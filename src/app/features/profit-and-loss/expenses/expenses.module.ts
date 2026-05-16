import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { ExpensesComponent } from './expenses.component';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    WidgetBoxModule,
  ],
  exports: [ExpensesComponent],
})
export class ExpensesModule {}
