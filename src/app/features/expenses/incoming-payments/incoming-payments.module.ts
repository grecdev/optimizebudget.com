import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';
import { AppIconModule } from '@shared/components/icon/icon.module';

import { IncomingPaymentsComponent } from './incoming-payments.component';

@NgModule({
  declarations: [IncomingPaymentsComponent],
  imports: [
    CommonModule,
    CurrencyPipe,
    //
    WidgetBoxModule,
    AppIconModule,
  ],
  exports: [IncomingPaymentsComponent],
})
export class IncomingPaymentsModule {}
