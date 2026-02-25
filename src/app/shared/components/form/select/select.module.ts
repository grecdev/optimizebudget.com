import { NgModule } from '@angular/core';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AppSelectComponent } from './select.component';
import { AppSelectOptionModule } from './select-option/select-option.module';

@NgModule({
  declarations: [AppSelectComponent],
  imports: [AppSelectOptionModule, AppIconModule],
  exports: [AppSelectComponent],
})
export class AppSelectModule {}
