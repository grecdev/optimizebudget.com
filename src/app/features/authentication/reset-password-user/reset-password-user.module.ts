import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PasswordRequirementContainerModule } from '@features/authentication/components/password-requirement-container/password-requirement-container.module';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { ResetPasswordUserRoutingModule } from './reset-password-user-routing.module';
import { ConfirmPasswordValidatorDirective } from './confirm-password-validator.directive';

import { ResetPasswordUserComponent } from './reset-password-user.component';

@NgModule({
  declarations: [ResetPasswordUserComponent, ConfirmPasswordValidatorDirective],
  imports: [
    CommonModule,
    //
    ResetPasswordUserRoutingModule,
    AuthenticationCommonModule,
    FormsModule,
    PasswordRequirementContainerModule,
  ],
})
export class ResetPasswordUserModule {}
