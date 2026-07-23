import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { environment } from '@environments/environment';
import { allRoutes } from '@script/globalData';

import { SnackbarPosition, SnackbarType } from '@shared/components/snackbar/snackbar.model';
import { SnackbarService } from '@shared/components/snackbar/snackbar.service';

import type { AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { AuthenticationService } from '@core/authentication/authentication.service';

import { InputTypes } from './reset-password-user.model';

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrls: ['../authentication-common.scss', './reset-password-user.component.scss'],
})
export class ResetPasswordUserComponent {
  /**
   * @summary - To show loading state.
   *
   * @type {boolean}
   *
   * @public
   */
  public resetPasswordLoading: boolean = false;

  public readonly InputTypes = InputTypes;

  /**
   * @summary - Navigation purposes.
   *
   * @type {Pick<typeof allRoutes, 'login'>}
   *
   * @public
   * @readonly
   */
  public readonly paths: Pick<typeof allRoutes, 'login'> = {
    login: allRoutes.login,
  };

  public readonly resetPasswordForm: Record<InputTypes, string> = {
    [InputTypes.PASSWORD]: '',
    [InputTypes.CONFIRM_PASSWORD]: '',
  };

  /**
   * @summary - Need overlay reference for cleanup.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @private
   */
  private _overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  private readonly _authenticationService: AuthenticationService;
  private readonly _snackbarService: SnackbarService;
  private readonly _changeDetectorRef: ChangeDetectorRef;

  constructor(
    authenticationService: AuthenticationService,
    snackbarService: SnackbarService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this._authenticationService = authenticationService;
    this._snackbarService = snackbarService;
    this._changeDetectorRef = changeDetectorRef;
  }

  public async handleForgotPassword(ngForm: NgForm): Promise<void> {
    if (ngForm.invalid) {
      return;
    }

    this.resetPasswordLoading = true;

    try {
      const PASSWORD = ngForm.value[InputTypes.PASSWORD];
      const CONFIRM_PASSWORD = ngForm.value[InputTypes.CONFIRM_PASSWORD];

      this._overlayReference = this._snackbarService.open({
        type: SnackbarType.SUCCESS,
        message: `Check email ${123} for password reset!`,
        position: {
          horizontal: SnackbarPosition.MIDDLE,
          vertical: SnackbarPosition.END,
        },
      });

      ngForm.resetForm();
    } catch (error) {
      if (error instanceof Error) {
        this._overlayReference = this._snackbarService.open({
          type: SnackbarType.ERROR,
          message: error.message,
          position: {
            horizontal: SnackbarPosition.MIDDLE,
            vertical: SnackbarPosition.END,
          },
        });
      }
    } finally {
      this.resetPasswordLoading = false;
      this._changeDetectorRef.markForCheck();

      this._initCloseSubscription();
    }
  }

  /**
   * @summary - Proper unsubscribe.
   *
   * @private
   * @returns {void}
   */
  private _initCloseSubscription(): void {
    if (!this._overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this._overlayReference.closingOverlay$.subscribe({
      next: () => {
        this._changeDetectorRef.markForCheck();
        this._overlayReference = null;
      },
    });
  }
}
