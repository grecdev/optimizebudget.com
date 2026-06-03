import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '@shared/components/button/button.module';
import { AppIconModule } from '@shared/components/icon/icon.module';

import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { DesktopHeaderComponent } from './desktop-header.component';

@NgModule({
  declarations: [DesktopHeaderComponent, UserAvatarComponent],
  imports: [CommonModule, AppButtonModule, AppIconModule],
  exports: [DesktopHeaderComponent],
})
export class DesktopHeaderModule {}
