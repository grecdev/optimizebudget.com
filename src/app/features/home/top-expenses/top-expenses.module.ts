import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { AppTableModule } from '@shared/components/table/table.module';
import { AppCardModule } from '@shared/components/card/card.module';

import { TopExpensesComponent } from './top-expenses.component';

@NgModule({
  declarations: [TopExpensesComponent],
  imports: [
    CommonModule,
    //
    WidgetBoxModule,
    AppTableModule,
    AppCardModule,
  ],
  exports: [TopExpensesComponent],
})
export class TopExpensesModule {}
