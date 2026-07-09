import { InjectionToken, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSnackbarComponent } from './snackbar.component';

export const APP_SNACKBAR_COMPONENT_REFERENCE = new InjectionToken<Type<AppSnackbarComponent>>(
  'APP_SNACKBAR_COMPONENT_REFERENCE'
);

@NgModule({
  declarations: [AppSnackbarComponent],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_SNACKBAR_COMPONENT_REFERENCE,
      useValue: AppSnackbarComponent,
    },
  ],
})
export class AppSnackbarModule {}
