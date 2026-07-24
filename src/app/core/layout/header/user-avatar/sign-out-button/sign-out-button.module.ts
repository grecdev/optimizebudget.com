import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '@shared/components/button/button.module';

import { AppSignOutButtonComponent } from './sign-out-button.component';

@NgModule({
  declarations: [AppSignOutButtonComponent],
  imports: [CommonModule, AppButtonModule],
  exports: [AppSignOutButtonComponent],
})
export class SignOutButtonModule {}
