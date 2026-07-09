import { type ComponentRef, type NgModuleRef } from '@angular/core';

import { type AppSnackbarModule } from './snackbar.module';
import { type AppSnackbarComponent } from './snackbar.component';

enum SnackbarType {
  ERROR = 'ERORR',
  INFO = 'INFO',
}

interface ComponentReferencesState {
  snackbarModuleRef: NgModuleRef<AppSnackbarModule> | null;
  snackbarComponentRef: ComponentRef<AppSnackbarComponent> | null;
}

type OpenOptions = CreateSnackbarModuleOptions;

type CreateSnackbarModuleOptions = Partial<{
  /* Projected content message */
  message: string;
  /* UI Styling */
  type: SnackbarType;
}>;

export type { ComponentReferencesState, OpenOptions, CreateSnackbarModuleOptions };
export { SnackbarType };
