import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '@shared/components/button/button.module';

import { AddExpenseDialogComponent } from './add-expense-dialog.component';

@NgModule({
  declarations: [AddExpenseDialogComponent],
  imports: [CommonModule, AppButtonModule],
  exports: [AddExpenseDialogComponent],
})
export class AddExpenseDialogModule {}
