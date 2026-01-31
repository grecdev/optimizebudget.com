import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '@shared/components/icon/icon.module';

import { PillStatusComponent } from './pill-status.component';

@NgModule({
  declarations: [PillStatusComponent],
  imports: [CommonModule, IconModule],
  exports: [PillStatusComponent],
})
export class PillStatusModule {}
