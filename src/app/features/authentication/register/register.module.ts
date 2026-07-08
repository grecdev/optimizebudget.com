import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register.component';

import { PasswordRequirementValidatorPipe } from './pipes/password-requirement-validator/password-requirement-validator.pipe';

@NgModule({
  declarations: [RegisterComponent, PasswordRequirementValidatorPipe],
  imports: [
    ReactiveFormsModule,
    //
    RegisterRoutingModule,
    AuthenticationCommonModule,
    AppIconModule,
  ],
})
export class RegisterModule {}
