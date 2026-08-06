import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AppButtonModule } from '@shared/components/button/button.module';

import { SidebarComponent } from './sidebar.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';

import { AppSidebarLogoModule } from '@core/layout/sidebar/logo/logo.module';

@NgModule({
  declarations: [SidebarComponent, BodyComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    //
    AppButtonModule,
    AppSidebarLogoModule,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
