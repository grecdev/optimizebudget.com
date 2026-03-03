import { InjectionToken, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormFieldModule } from '@shared/components/form/form-field/form-field.module';
import { AppInputModule } from '@shared/components/form/input/input.module';
import { AppButtonModule } from '@shared/components/button/button.module';
import { AppSelectModule } from '@shared/components/form/select/select.module';

import { ExpenseDialogBodyComponent } from './expense-dialog-body.component';

export const ADD_EXPENSE_DIALOG_BODY_REFERENCE = new InjectionToken<
  Type<ExpenseDialogBodyComponent>
>('ADD_EXPENSE_DIALOG_BODY_REFERENCE');

@NgModule({
  declarations: [ExpenseDialogBodyComponent],
  imports: [
    CommonModule,
    AppFormFieldModule,
    AppInputModule,
    AppButtonModule,
    AppSelectModule,
  ],
  providers: [
    {
      provide: ADD_EXPENSE_DIALOG_BODY_REFERENCE,
      useValue: ExpenseDialogBodyComponent,
    },
  ],
})
export class ExpenseDialogBodyModule {}
