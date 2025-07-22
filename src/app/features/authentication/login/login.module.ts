import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@shared/components/button/button.component';
import { AppInputModule } from '@shared/components/form/input/input.module';
import { AppFormFieldModule } from '@shared/components/form/form-field/form-field.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent, ButtonComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, AppFormFieldModule, AppInputModule],
})
export class LoginModule {}
