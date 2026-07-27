import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInformationComponent } from './user-information.component';

@NgModule({
  declarations: [UserInformationComponent],
  imports: [CommonModule],
  exports: [UserInformationComponent],
})
export class UserInformationModule {}
