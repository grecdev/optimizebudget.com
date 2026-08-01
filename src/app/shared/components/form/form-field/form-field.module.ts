import { NgModule } from '@angular/core';

import { AppInfoTextModule } from '@shared/components/info-text/info-text.module';

import { AppInputLabel } from './directives/label';
import { AppFormField } from './form-field.component';

@NgModule({
  declarations: [AppFormField, AppInputLabel],
  imports: [AppInfoTextModule],
  exports: [AppFormField, AppInputLabel],
})
export class AppFormFieldModule {}
