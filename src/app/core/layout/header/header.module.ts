import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@shared/components/button/button.module';

import { UserAvatarComponent } from './user-avatar/user-avatar.component';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent, UserAvatarComponent],
  imports: [CommonModule, ButtonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
