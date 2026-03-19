import { NgModule } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { AppSelectComponent } from './select.component';
import { AppSelectOptionModule } from './select-option/select-option.module';

@NgModule({
  declarations: [AppSelectComponent],
  imports: [NgStyle, NgIf, AppSelectOptionModule, AppIconModule],
  exports: [AppSelectComponent],
})
export class AppSelectModule {}
