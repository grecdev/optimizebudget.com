import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRequirementComponent } from './password-requirement.component';
import { AppIconModule } from '@shared/components/icon/icon.module';

@NgModule({
  declarations: [PasswordRequirementComponent],
  imports: [CommonModule, AppIconModule],
  exports: [PasswordRequirementComponent],
})
export class PasswordRequirementModule {}
