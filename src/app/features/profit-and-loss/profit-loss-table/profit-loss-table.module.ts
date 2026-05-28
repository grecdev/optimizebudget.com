import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, NgFor, NgIf, DecimalPipe } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';
import { AppTableModule } from '@shared/components/table/table.module';

import { IsNumberTypePipe } from './pipes/is-number-type/is-number-type.pipe';
import { IsInfoCellPipe } from './pipes/is-info-cell/is-info-cell.pipe';
import { RowTypeValuePipe } from './pipes/row-type-value/row-type-value.pipe';
import { IsProfitMarginPipe } from './pipes/is-profit-margin/is-profit-margin.pipe';

import { ProfitLossTableComponent } from './profit-loss-table.component';

@NgModule({
  declarations: [
    ProfitLossTableComponent,
    // Pipes
    IsNumberTypePipe,
    IsInfoCellPipe,
    RowTypeValuePipe,
    IsProfitMarginPipe,
  ],
  imports: [
    // Angular specific
    CommonModule,
    NgFor,
    NgIf,
    // Pipes
    CurrencyPipe,
    DecimalPipe,
    // App specific
    WidgetBoxModule,
    AppTableModule,
  ],
  exports: [ProfitLossTableComponent],
})
export class ProfitLossTableModule {}
