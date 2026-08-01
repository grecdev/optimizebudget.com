import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLoaderModule } from '@shared/components/loader/loader.module';
import { AppInfoTextModule } from '@shared/components/info-text/info-text.module';

import { UserInformationComponent } from './user-information.component';

@NgModule({
  declarations: [UserInformationComponent],
  imports: [
    CommonModule,
    //
    AppLoaderModule,
    AppInfoTextModule,
  ],
  exports: [UserInformationComponent],
})
export class UserInformationModule {}
