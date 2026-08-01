import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { environment } from '@environments/environment';

import { allRoutes } from '@script/globalData';

import { AuthenticationService } from '@core/authentication/authentication.service';
import type { AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { SnackbarService } from '@shared/components/snackbar/snackbar.service';
import { SnackbarPosition, SnackbarType } from '@shared/components/snackbar/snackbar.model';

import { InputTypes } from './forgot-password.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../authentication-common.scss', './forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
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
    [InputTypes.EMAIL]: '',
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
      const EMAIL = ngForm.value[InputTypes.EMAIL];

      await this._authenticationService.sendResetPasswordLink({
        email: EMAIL,
        options: {
          redirectTo: `${environment.emailRedirectTo}/${allRoutes.resetPasswordUser.path}`,
        },
      });

      this._overlayReference = this._snackbarService.open({
        type: SnackbarType.SUCCESS,
        message: `Check email ${EMAIL} for password reset!`,
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
