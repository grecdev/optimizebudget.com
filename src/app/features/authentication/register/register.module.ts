import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register.component';

import { PasswordRequirementValidatorPipe } from './pipes/password-requirement-validator/password-requirement-validator.pipe';

import { PasswordRequirementModule } from './password-requirement/password-requirement.module';

@NgModule({
  declarations: [RegisterComponent, PasswordRequirementValidatorPipe],
  imports: [
    ReactiveFormsModule,
    //
    RegisterRoutingModule,
    AuthenticationCommonModule,
    AppIconModule,
    PasswordRequirementModule,
  ],
})
export class RegisterModule {}
