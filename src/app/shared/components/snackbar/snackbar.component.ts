import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { type CreateSnackbarModuleOptions, SnackbarType } from './snackbar.model';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSnackbarComponent implements CreateSnackbarModuleOptions {
  public message: string = '';
  public type: SnackbarType = SnackbarType.INFO;
}
