import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { RevenueComponent } from './revenue.component';

@NgModule({
  declarations: [RevenueComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    WidgetBoxModule,
  ],
  exports: [RevenueComponent],
})
export class RevenueModule {}
