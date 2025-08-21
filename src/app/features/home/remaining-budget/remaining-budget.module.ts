import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemainingBudgetComponent } from './remaining-budget.component';
import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

@NgModule({
  declarations: [RemainingBudgetComponent],
  imports: [CommonModule, WidgetBoxModule],
  exports: [RemainingBudgetComponent],
})
export class RemainingBudgetModule {}
