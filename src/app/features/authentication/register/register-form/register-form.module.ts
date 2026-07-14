import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AppButtonModule } from '@shared/components/button/button.module';
import { AppFormFieldModule } from '@shared/components/form/form-field/form-field.module';
import { AppInputModule } from '@shared/components/form/input/input.module';

import { AuthenticationCommonModule } from '@features/authentication/authentication-common.module';
import { PasswordRequirementModule } from '@features/authentication/register/password-requirement/password-requirement.module';

import { PasswordRequirementValidatorPipe } from '../pipes/password-requirement-validator/password-requirement-validator.pipe';

import { RegisterFormComponent } from './register-form.component';

@NgModule({
  declarations: [RegisterFormComponent, PasswordRequirementValidatorPipe],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    //
    AppButtonModule,
    AppFormFieldModule,
    AppInputModule,
    AuthenticationCommonModule,
    PasswordRequirementModule,
  ],
  exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
