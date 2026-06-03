import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '@shared/components/button/button.module';
import { AppIconModule } from '@shared/components/icon/icon.module';

import { DesktopHeaderModule } from './desktop-header/desktop-header.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    AppIconModule,
    DesktopHeaderModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
