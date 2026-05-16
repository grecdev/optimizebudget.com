import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { StatusPillModule } from '../status-pill/status-pill.module';
import { RevenueComponent } from './revenue.component';

@NgModule({
  declarations: [RevenueComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    WidgetBoxModule,
    StatusPillModule,
  ],
  exports: [RevenueComponent],
})
export class RevenueModule {}
