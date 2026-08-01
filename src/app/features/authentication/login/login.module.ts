import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    //
    LoginRoutingModule,
    AuthenticationCommonModule,
  ],
})
export class LoginModule {}
