import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLoaderModule } from '@shared/components/loader/loader.module';

import { AppButtonComponent } from './button.component';
import { IconButtonComponent } from './icon-button.component';

@NgModule({
  declarations: [AppButtonComponent, IconButtonComponent],
  imports: [
    CommonModule,
    //
    AppLoaderModule,
  ],
  exports: [AppButtonComponent, IconButtonComponent],
})
export class AppButtonModule {}
