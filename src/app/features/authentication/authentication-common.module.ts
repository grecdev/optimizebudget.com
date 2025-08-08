import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AppFormFieldModule } from '@shared/components/form/form-field/form-field.module';
import { AppInputModule } from '@shared/components/form/input/input.module';
import { ButtonModule } from '@shared/components/button/button.module';

import { AuthenticationLogoContainerComponent } from './components/authentication-logo-container/authentication-logo-container.component';
import { AgreeInfoComponent } from './components/agree-info/agree-info.component';
import { AppFormDelimiterComponent } from './components/form-delimiter/form-delimiter.component';

@NgModule({
  declarations: [
    AuthenticationLogoContainerComponent,
    AgreeInfoComponent,
    AppFormDelimiterComponent,
  ],
  imports: [CommonModule, AppFormFieldModule, AppInputModule, RouterLink, ButtonModule],
  exports: [
    CommonModule,
    AppFormFieldModule,
    AppInputModule,
    ButtonModule,
    //
    AuthenticationLogoContainerComponent,
    AgreeInfoComponent,
    AppFormDelimiterComponent,
  ],
})
export class AuthenticationCommonModule {}
