import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../icon/icon.module';

import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, IconModule],
  exports: [DialogComponent],
})
export class DialogModule {}
