import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonComponent } from './button.component';
import { IconButtonComponent } from './icon-button.component';

@NgModule({
  declarations: [AppButtonComponent, IconButtonComponent],
  imports: [CommonModule],
  exports: [AppButtonComponent, IconButtonComponent],
})
export class AppButtonModule {}
