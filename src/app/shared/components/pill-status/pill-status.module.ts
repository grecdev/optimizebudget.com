import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { PillStatusComponent } from './pill-status.component';

@NgModule({
  declarations: [PillStatusComponent],
  imports: [CommonModule, AppIconModule],
  exports: [PillStatusComponent],
})
export class PillStatusModule {}
