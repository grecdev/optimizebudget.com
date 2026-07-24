import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAvatarComponent } from './user-avatar.component';
import { SignOutButtonModule } from './sign-out-button/sign-out-button.module';

@NgModule({
  declarations: [UserAvatarComponent],
  imports: [CommonModule, SignOutButtonModule],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
