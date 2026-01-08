import { NgModule } from '@angular/core';

import { TopExpensesComponent } from './top-expenses.component';
import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

@NgModule({
  declarations: [TopExpensesComponent],
  imports: [WidgetBoxModule],
  exports: [TopExpensesComponent],
})
export class TopExpensesModule {}
