import { NgModule } from '@angular/core';

import { InfoTextComponent } from '@shared/components/info-text/info-text.component';

import { AppInputLabel } from './directives/label';
import { AppFormField } from './form-field.component';

@NgModule({
  declarations: [AppFormField, AppInputLabel, InfoTextComponent],
  exports: [AppFormField, AppInputLabel],
})
export class AppFormFieldModule {}
