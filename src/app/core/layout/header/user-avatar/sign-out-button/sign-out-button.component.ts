import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { allRoutes } from '@script/globalData';

import type { AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { SnackbarService } from '@shared/components/snackbar/snackbar.service';
import { AuthenticationService } from '@core/authentication/authentication.service';

import { SnackbarPosition, SnackbarType } from '@shared/components/snackbar/snackbar.model';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSignOutButtonComponent {
  /**
   * @summary - UX loading state.
   *
   * @type {boolean}
   *
   * @public
   */
  public requestLoading: boolean = false;

  /**
   * @summary - Need overlay reference for cleanup.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @private
   */
  private _overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _router: Router;

  private readonly _authenticationService: AuthenticationService;
  private readonly _snackbarService: SnackbarService;

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
   * @summary - Event handler for sign out request.
   *
   * @param {MouseEvent} event - Event object.
   *
   * @public
   * @returns {void}
   */
  public async handleSignOut(event: MouseEvent): Promise<void> {
    event.stopPropagation();

    this.requestLoading = true;

    try {
      await this._authenticationService.signOut();

      this._router.navigate([allRoutes.login.path]);
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

        this.requestLoading = false;
        this._changeDetectorRef.markForCheck();
      }
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
