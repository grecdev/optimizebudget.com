import { InjectionToken, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormFieldModule } from '@shared/components/form/form-field/form-field.module';
import { AppInputModule } from '@shared/components/form/input/input.module';
import { AppButtonModule } from '@shared/components/button/button.module';

import { DialogBodyComponent } from './dialog-body.component';

export const ADD_EXPENSE_DIALOG_BODY_REFERENCE = new InjectionToken<
  Type<DialogBodyComponent>
>('ADD_EXPENSE_DIALOG_BODY_REFERENCE');

@NgModule({
  declarations: [DialogBodyComponent],
  imports: [CommonModule, AppFormFieldModule, AppInputModule, AppButtonModule],
  providers: [
    {
      provide: ADD_EXPENSE_DIALOG_BODY_REFERENCE,
      useValue: DialogBodyComponent,
    },
  ],
})
export class DialogBodyModule {}
