import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AppSuccessRequestComponent } from './success-request.component';

@NgModule({
  declarations: [AppSuccessRequestComponent],
  imports: [
    CommonModule,
    RouterLink,
    //
    AppIconModule,
  ],
  exports: [AppSuccessRequestComponent],
})
export class SuccessRequestModule {}
