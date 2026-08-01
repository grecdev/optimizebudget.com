import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { environment } from '@environments/environment';
import { allRoutes, regexPatterns } from '@script/globalData';

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

  public readonly regexPatterns = regexPatterns;

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
    [InputTypes.CURRENT_PASSWORD]: '',
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

  public async handleResetPassword(ngForm: NgForm): Promise<void> {
    if (ngForm.invalid) {
      return;
    }

    this.resetPasswordLoading = true;

    try {
      const USER_UPDATE_RESPONSE = await this._authenticationService.getUser();

      const EMAIL =
        USER_UPDATE_RESPONSE.data &&
        USER_UPDATE_RESPONSE.data.user &&
        USER_UPDATE_RESPONSE.data.user.email
          ? USER_UPDATE_RESPONSE.data.user.email
          : '';

      const CURRENT_PASSWORD = ngForm.value[InputTypes.CURRENT_PASSWORD];
      const NEW_PASSWORD = ngForm.value['newPasswordGroup'][InputTypes.CONFIRM_PASSWORD];

      await this._authenticationService.signIn({
        email: EMAIL,
        password: CURRENT_PASSWORD,
      });

      await this._authenticationService.resetPassword({
        email: EMAIL,
        current_password: CURRENT_PASSWORD,
        password: NEW_PASSWORD,
      });

      this._overlayReference = this._snackbarService.open({
        type: SnackbarType.SUCCESS,
        message: `Password successfully reset for ${EMAIL}!`,
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
