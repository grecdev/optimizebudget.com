import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AppLoaderModule } from '@shared/components/loader/loader.module';
import { AppInfoTextModule } from '@shared/components/info-text/info-text.module';

import { UserAvatarComponent } from './user-avatar.component';

import { SignOutButtonModule } from './sign-out-button/sign-out-button.module';
import { UserInformationModule } from './user-information/user-information.module';

import { FormatNamePipe } from './pipes/format-name.pipe';

@NgModule({
  declarations: [UserAvatarComponent, FormatNamePipe],
  imports: [
    CommonModule,
    NgOptimizedImage,
    //
    SignOutButtonModule,
    UserInformationModule,
    AppLoaderModule,
    AppInfoTextModule,
  ],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
