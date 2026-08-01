import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AppButtonModule } from '@shared/components/button/button.module';
import { AppFormFieldModule } from '@shared/components/form/form-field/form-field.module';
import { AppInputModule } from '@shared/components/form/input/input.module';

import { AuthenticationCommonModule } from '../../authentication-common.module';
import { PasswordRequirementContainerModule } from '../../components/password-requirement-container/password-requirement-container.module';

import { RegisterFormComponent } from './register-form.component';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    //
    AppButtonModule,
    AppFormFieldModule,
    AppInputModule,
    AuthenticationCommonModule,
    PasswordRequirementContainerModule,
  ],
  exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
