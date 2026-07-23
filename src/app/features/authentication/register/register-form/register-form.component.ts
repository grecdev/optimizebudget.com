import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { allRoutes, regexPatterns } from '@script/globalData';

import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';
import { SnackbarType, SnackbarPosition } from '@shared/components/snackbar/snackbar.model';

import { SnackbarService } from '@shared/components/snackbar/snackbar.service';
import { AuthenticationService } from '@core/authentication/authentication.service';

import { confirmPasswordValidator } from '../../validators';
import { InputTypes } from './register-form.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../../authentication-common.scss', './register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  protected readonly InputTypes = InputTypes;

  public signUpLoading: boolean = false;

  /**
   * @summary - Show a success register view.
   *
   * @type {EventEmitter<boolean>}
   *
   * @public
   */
  @Output() public registerSuccessEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly _authenticationService: AuthenticationService;
  private readonly _snackbarService: SnackbarService;
  private readonly _changeDetectorRef: ChangeDetectorRef;

  /**
   * @summary - Need overlay reference for cleanup.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @private
   */
  private _overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - Routes to redirect from within the template.
   *
   * @type {Pick<typeof allRoutes, 'login'>}
   *
   * @public
   */
  public paths: Pick<typeof allRoutes, 'login'> = {
    login: allRoutes.login,
  };

  public readonly registerForm: FormGroup = new FormGroup(
    {
      [InputTypes.DISPLAY_NAME]: new FormControl('', {
        validators: [Validators.required, Validators.pattern(regexPatterns.fullName)],
      }),
      [InputTypes.EMAIL]: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      [InputTypes.PASSWORD]: new FormControl('', {
        validators: [Validators.required, Validators.pattern(regexPatterns.password)],
      }),
      [InputTypes.CONFIRM_PASSWORD]: new FormControl('', {
        validators: [Validators.required],
      }),
    },
    {
      validators: confirmPasswordValidator(),
    }
  );

  constructor(
    authenticationService: AuthenticationService,
    snackbarService: SnackbarService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this._authenticationService = authenticationService;
    this._snackbarService = snackbarService;
    this._changeDetectorRef = changeDetectorRef;
  }

  public async handleSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      return;
    }

    this.signUpLoading = true;

    try {
      await this._authenticationService.signUp({
        email: this.registerForm.value[InputTypes.EMAIL],
        password: this.registerForm.value[InputTypes.CONFIRM_PASSWORD],
        options: {
          data: {
            [InputTypes.DISPLAY_NAME]: this.registerForm.value[InputTypes.DISPLAY_NAME],
          },
          emailRedirectTo: allRoutes.overview.path,
        },
      });

      this.registerSuccessEmitter.emit(true);
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
      this.signUpLoading = false;
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
