import { NgModule } from '@angular/core';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AuthenticationCommonModule } from '../authentication-common.module';
import { PasswordRequirementModule } from '../components/password-requirement/password-requirement.module';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register.component';

import { SuccessRequestModule } from '../components/success-request/success-request.module';
import { RegisterFormModule } from './register-form/register-form.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RegisterRoutingModule,
    AuthenticationCommonModule,
    AppIconModule,
    PasswordRequirementModule,
    SuccessRequestModule,
    RegisterFormModule,
  ],
})
export class RegisterModule {}
