import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { DesktopHeaderModule } from './desktop-header/desktop-header.module';
import { MobileHeaderModule } from './mobile-header/mobile-header.module';
import { SidebarToggleModule } from './sidebar-toggle/sidebar-toggle.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    AppIconModule,
    DesktopHeaderModule,
    MobileHeaderModule,
    SidebarToggleModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
