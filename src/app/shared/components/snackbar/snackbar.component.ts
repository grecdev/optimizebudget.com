import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SnackbarType, type CreateSnackbarModuleOptions } from './snackbar.model';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'app-snackbar',

    '[class.snackbar-type-error]': 'type === SnackbarType.ERROR',
  },
})
export class AppSnackbarComponent implements CreateSnackbarModuleOptions {
  public SnackbarType = SnackbarType;

  public message: CreateSnackbarModuleOptions['message'] = '';
  public type: CreateSnackbarModuleOptions['type'] = SnackbarType.INFO;
}
