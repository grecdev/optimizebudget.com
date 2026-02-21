import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AppButtonModule } from '@shared/components/button/button.module';

import { SidebarComponent } from './sidebar.component';
import { LogoComponent } from './logo/logo.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [SidebarComponent, LogoComponent, BodyComponent, FooterComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive, AppButtonModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
