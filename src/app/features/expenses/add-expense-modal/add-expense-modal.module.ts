import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '@shared/components/button/button.module';

import { AddExpenseModalComponent } from './add-expense-modal.component';

@NgModule({
  declarations: [AddExpenseModalComponent],
  imports: [CommonModule, AppButtonModule],
  exports: [AddExpenseModalComponent],
})
export class AddExpenseModalModule {}
