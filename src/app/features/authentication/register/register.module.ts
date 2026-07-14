import { NgModule } from '@angular/core';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register.component';

import { PasswordRequirementModule } from './password-requirement/password-requirement.module';
import { SuccessRegisterModule } from './success-register/success-register.module';
import { RegisterFormModule } from './register-form/register-form.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RegisterRoutingModule,
    AuthenticationCommonModule,
    AppIconModule,
    PasswordRequirementModule,
    SuccessRegisterModule,
    RegisterFormModule,
  ],
})
export class RegisterModule {}
