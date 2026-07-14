import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AppSuccessRegisterComponent } from './success-register.component';

@NgModule({
  declarations: [AppSuccessRegisterComponent],
  imports: [
    CommonModule,
    RouterLink,
    //
    AppIconModule,
  ],
  exports: [AppSuccessRegisterComponent],
})
export class SuccessRegisterModule {}
