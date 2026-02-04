import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '@shared/components/button/button.module';
import { IconModule } from '@shared/components/icon/icon.module';

import { UserAvatarComponent } from './user-avatar/user-avatar.component';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent, UserAvatarComponent],
  imports: [CommonModule, AppButtonModule, IconModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
