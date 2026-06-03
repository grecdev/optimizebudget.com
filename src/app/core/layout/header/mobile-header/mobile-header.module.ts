import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '@shared/components/button/button.module';
import { AppIconModule } from '@shared/components/icon/icon.module';

import { UserAvatarModule } from '../user-avatar/user-avatar.module';

import { MobileHeaderComponent } from './mobile-header.component';

@NgModule({
  declarations: [MobileHeaderComponent],
  imports: [CommonModule, AppButtonModule, AppIconModule, UserAvatarModule],
  exports: [MobileHeaderComponent],
})
export class MobileHeaderModule {}
