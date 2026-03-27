import { InjectionToken, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonModule } from '../button/button.module';
import { AppIconModule } from '../icon/icon.module';

import { AppDialogComponent } from './dialog.component';

export const APP_DIALOG_COMPONENT_REFERENCE = new InjectionToken<
  Type<AppDialogComponent>
>('APP_DIALOG_COMPONENT_REFERENCE');

@NgModule({
  declarations: [AppDialogComponent],
  imports: [CommonModule, AppIconModule, AppButtonModule],
  providers: [
    {
      provide: APP_DIALOG_COMPONENT_REFERENCE,
      useValue: AppDialogComponent,
    },
  ],
})
export class AppDialogModule {}
