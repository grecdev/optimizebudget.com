import { NgModule } from '@angular/core';

import { AppFormFieldModule } from '../form-field/form-field.module';
import { AppInput } from './input.directive';

@NgModule({
  imports: [AppFormFieldModule],
  declarations: [AppInput],
  exports: [AppInput, AppFormFieldModule],
})
export class AppInputModule {}
