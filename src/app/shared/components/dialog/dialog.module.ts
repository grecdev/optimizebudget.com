import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '../button/button.module';
import { AppIconModule } from '../icon/icon.module';

import { AppDialogComponent } from './dialog.component';

@NgModule({
  declarations: [AppDialogComponent],
  imports: [CommonModule, AppIconModule, AppButtonModule],
})
export class AppDialogModule {}
