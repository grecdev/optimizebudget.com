import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalMonthlyExpensesComponent } from './total-monthly-expenses.component';

@NgModule({
  declarations: [TotalMonthlyExpensesComponent],
  imports: [CommonModule],
  exports: [TotalMonthlyExpensesComponent],
})
export class TotalMonthlyExpensesModule {}
