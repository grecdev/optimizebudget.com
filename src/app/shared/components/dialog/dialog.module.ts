import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '@shared/components/button/button.module';

import { AppIconModule } from '../icon/icon.module';

import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, AppIconModule, AppButtonModule],
  exports: [DialogComponent],
})
export class DialogModule {}
