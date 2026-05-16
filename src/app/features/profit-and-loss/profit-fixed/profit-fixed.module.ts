import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { StatusPillModule } from '../status-pill/status-pill.module';
import { ProfitFixedComponent } from './profit-fixed.component';

@NgModule({
  declarations: [ProfitFixedComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    WidgetBoxModule,
    StatusPillModule,
  ],
  exports: [ProfitFixedComponent],
})
export class ProfitFixedModule {}
