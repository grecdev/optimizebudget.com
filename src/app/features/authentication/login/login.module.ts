import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '@shared/components/button/button.module';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRoutingModule, AuthenticationCommonModule, FormsModule, ButtonModule],
})
export class LoginModule {}
