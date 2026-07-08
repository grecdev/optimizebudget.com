import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AuthenticationCommonModule } from '../authentication-common.module';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    ReactiveFormsModule,
    //
    RegisterRoutingModule,
    AuthenticationCommonModule,
    AppIconModule,
  ],
})
export class RegisterModule {}
