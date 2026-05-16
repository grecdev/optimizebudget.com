import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { StatusPillModule } from '../status-pill/status-pill.module';
import { ExpensesComponent } from './expenses.component';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    WidgetBoxModule,
    StatusPillModule,
  ],
  exports: [ExpensesComponent],
})
export class ExpensesModule {}
