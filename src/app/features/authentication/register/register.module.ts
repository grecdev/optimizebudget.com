import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [RegisterRoutingModule, AuthenticationCommonModule, ReactiveFormsModule],
})
export class RegisterModule {}
