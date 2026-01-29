import { NgModule } from '@angular/core';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { MoneyStatisticsComponent } from './money-statistics.component';

@NgModule({
  declarations: [MoneyStatisticsComponent],
  imports: [WidgetBoxModule],
  exports: [MoneyStatisticsComponent],
})
export class MoneyStatisticsModule {}
