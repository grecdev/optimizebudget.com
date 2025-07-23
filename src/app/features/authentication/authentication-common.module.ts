import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormFieldModule } from '@shared/components/form/form-field/form-field.module';
import { AppInputModule } from '@shared/components/form/input/input.module';
import { ButtonComponent } from '@shared/components/button/button.component';

import { AuthenticationLogoContainerComponent } from './authentication-logo-container/authentication-logo-container.component';
import { AgreeInfoComponent } from './agree-info/agree-info.component';
import { AppFormDelimiterComponent } from './form-delimiter/form-delimiter.component';

@NgModule({
  declarations: [
    AuthenticationLogoContainerComponent,
    AgreeInfoComponent,
    AppFormDelimiterComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, AppFormFieldModule, AppInputModule],
  exports: [
    CommonModule,
    AppFormFieldModule,
    AppInputModule,
    //
    AuthenticationLogoContainerComponent,
    AgreeInfoComponent,
    AppFormDelimiterComponent,
    ButtonComponent,
  ],
})
export class AuthenticationCommonModule {}
