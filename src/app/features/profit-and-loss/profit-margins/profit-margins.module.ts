import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { ProfitMarginsComponent } from './profit-margins.component';
import { StatusPillModule } from '@features/profit-and-loss/status-pill/status-pill.module';

@NgModule({
  declarations: [ProfitMarginsComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    WidgetBoxModule,
    StatusPillModule,
  ],
  exports: [ProfitMarginsComponent],
})
export class ProfitMarginsModule {}
