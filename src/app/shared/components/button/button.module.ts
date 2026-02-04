import { NgModule } from '@angular/core';

import { AppButtonComponent } from './button.component';
import { IconButtonComponent } from './icon-button.component';

@NgModule({
  declarations: [AppButtonComponent, IconButtonComponent],
  exports: [AppButtonComponent, IconButtonComponent],
})
export class AppButtonModule {}
