import { type ComponentRef, type NgModuleRef } from '@angular/core';

import { type AppSnackbarModule } from './snackbar.module';
import { type AppSnackbarComponent } from './snackbar.component';

enum SnackbarType {
  ERROR = 'ERORR',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}

enum SnackbarPosition {
  START = 'START',
  MIDDLE = 'MIDDLE',
  END = 'END',
}

interface ComponentReferencesState {
  snackbarModuleRef: NgModuleRef<AppSnackbarModule> | null;
  snackbarComponentRef: ComponentRef<AppSnackbarComponent> | null;
}

type CreateSnackbarModuleOptions = Partial<{
  /* Projected content message */
  message: string;
  /* UI Styling */
  type: SnackbarType;
  /* Position on the screen */
  position: {
    horizontal: SnackbarPosition;
    vertical: SnackbarPosition;
  };
}>;

type OpenSnackbarOptions = CreateSnackbarModuleOptions;

interface GetOverlayStylesOptions {
  position: CreateSnackbarModuleOptions['position'];
}

export type {
  ComponentReferencesState,
  OpenSnackbarOptions,
  CreateSnackbarModuleOptions,
  GetOverlayStylesOptions,
};

export { SnackbarType, SnackbarPosition };
