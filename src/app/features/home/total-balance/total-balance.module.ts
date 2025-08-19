import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { TotalBalanceComponent } from './total-balance.component';

@NgModule({
  declarations: [TotalBalanceComponent],
  imports: [CommonModule, WidgetBoxModule],
  exports: [TotalBalanceComponent],
})
export class TotalBalanceModule {}
