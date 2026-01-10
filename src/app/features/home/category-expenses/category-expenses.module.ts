import { NgModule } from '@angular/core';
import { CurrencyPipe, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';
import { CategoryExpensesComponent } from './category-expenses.component';

@NgModule({
  declarations: [CategoryExpensesComponent],
  imports: [FormsModule, WidgetBoxModule, NgFor, CurrencyPipe, NgStyle],
  exports: [CategoryExpensesComponent],
})
export class CategoryExpensesModule {}
