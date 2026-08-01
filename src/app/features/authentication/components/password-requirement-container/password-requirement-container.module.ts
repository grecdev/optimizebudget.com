import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRequirementValidatorPipe } from '../../pipes/password-requirement-validator/password-requirement-validator.pipe';

import { PasswordRequirementModule } from '../password-requirement/password-requirement.module';

import { PasswordRequirementContainerComponent } from './password-requirement-container.component';

@NgModule({
  declarations: [PasswordRequirementContainerComponent, PasswordRequirementValidatorPipe],
  imports: [CommonModule, PasswordRequirementModule],
  exports: [PasswordRequirementContainerComponent],
})
export class PasswordRequirementContainerModule {}
