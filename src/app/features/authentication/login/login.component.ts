import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { allRoutes } from '@script/globalData';

import { AuthenticationService } from '@core/authentication/authentication.service';

import { SnackbarPosition, SnackbarType } from '@shared/components/snackbar/snackbar.model';
import { SnackbarService } from '@shared/components/snackbar/snackbar.service';

import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { InputTypes } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication-common.scss', './login.component.scss'],
})
export class LoginComponent {
  /**
   * @summary - To show loading state.
   *
   * @type {boolean}
   *
   * @public
   */
  public loginLoading: boolean = false;

  public readonly InputTypes = InputTypes;

  /**
   * @summary - To navigate.
   *
   * @type {Pick<typeof allRoutes, 'register' | 'resetPassword'>}
   *
   * @public
   * @readonly
   */
  public readonly paths: Pick<typeof allRoutes, 'register' | 'resetPassword'> = {
    register: allRoutes.register,
    resetPassword: allRoutes.resetPassword,
  };

  public readonly loginForm: Record<InputTypes, string> = {
    [InputTypes.EMAIL]: 'grecualexandru001@gmail.com',
    [InputTypes.PASSWORD]: 'Test123!',
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
  private readonly _router: Router;

  constructor(
    authenticationService: AuthenticationService,
    snackbarService: SnackbarService,
    changeDetectorRef: ChangeDetectorRef,
    router: Router
  ) {
    this._authenticationService = authenticationService;
    this._snackbarService = snackbarService;
    this._changeDetectorRef = changeDetectorRef;
    this._router = router;
  }

  /**
   * @summary - Sign in the user.
   *
   * @param {NgForm} ngForm - Angular template form data.
   *
   * @public
   */
  public async handleLogin(ngForm: NgForm): Promise<void> {
    if (ngForm.invalid) {
      return;
    }

    this.loginLoading = true;

    try {
      const RESPONSE = await this._authenticationService.signIn({
        email: ngForm.value[InputTypes.EMAIL],
        password: ngForm.value[InputTypes.PASSWORD],
      });

      if (!RESPONSE || !RESPONSE.data.session) {
        return;
      }

      this._router.navigate([allRoutes.overview.path]);
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

        this._initCloseSubscription();
      }
    } finally {
      this.loginLoading = false;
      this._changeDetectorRef.markForCheck();
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
