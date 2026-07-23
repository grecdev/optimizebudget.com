import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { ResetPasswordUserRoutingModule } from './reset-password-user-routing.module';
import { ResetPasswordUserComponent } from './reset-password-user.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResetPasswordUserComponent],
  imports: [
    CommonModule,
    //
    ResetPasswordUserRoutingModule,
    AuthenticationCommonModule,
    FormsModule,
  ],
})
export class ResetPasswordUserModule {}
