import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';
import { AppTableModule } from '@shared/components/table/table.module';

import { ProfitLossTableComponent } from './profit-loss-table.component';

@NgModule({
  declarations: [ProfitLossTableComponent],
  imports: [
    // Angular specific
    CommonModule,
    NgFor,
    NgIf,
    CurrencyPipe,
    // App specific
    WidgetBoxModule,
    AppTableModule,
  ],
  exports: [ProfitLossTableComponent],
})
export class ProfitLossTableModule {}
