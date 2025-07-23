import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [ForgotPasswordRoutingModule, AuthenticationCommonModule, FormsModule],
})
export class ForgotPasswordModule {}
