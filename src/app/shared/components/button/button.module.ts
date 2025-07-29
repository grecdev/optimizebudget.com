import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';
import { IconButtonComponent } from './icon-button.component';

@NgModule({
  declarations: [ButtonComponent, IconButtonComponent],
  exports: [ButtonComponent, IconButtonComponent],
})
export class ButtonModule {}
