import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAvatarComponent } from './user-avatar.component';
import { SignOutButtonModule } from './sign-out-button/sign-out-button.module';
import { UserInformationModule } from './user-information/user-information.module';

@NgModule({
  declarations: [UserAvatarComponent],
  imports: [CommonModule, SignOutButtonModule, UserInformationModule],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
