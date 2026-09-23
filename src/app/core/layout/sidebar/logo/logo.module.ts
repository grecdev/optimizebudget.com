import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { LogoComponent } from './logo.component';

@NgModule({
  declarations: [LogoComponent],
  imports: [NgOptimizedImage],
  exports: [LogoComponent],
})
export class AppSidebarLogoModule {}
