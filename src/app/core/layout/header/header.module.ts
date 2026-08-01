import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { SidebarToggleModule } from './sidebar-toggle/sidebar-toggle.module';
import { RightSideModule } from './right-side/right-side.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    AppIconModule,
    RightSideModule,
    SidebarToggleModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
