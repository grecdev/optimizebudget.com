import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppIconModule } from '@shared/components/icon/icon.module';

import { StatusPillComponent } from './status-pill.component';

@NgModule({
  declarations: [StatusPillComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    AppIconModule,
  ],
  exports: [StatusPillComponent],
})
export class StatusPillModule {}
