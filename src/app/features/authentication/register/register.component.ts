import { ChangeDetectorRef, Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { allRoutes } from '@script/globalData';

import { SnackbarType } from '@shared/components/snackbar/snackbar.model';
import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { SnackbarService } from '@shared/components/snackbar/snackbar.service';
import { AuthenticationService } from '@core/authentication/authentication.service';

import { type RegexPatterns, InputTypes } from './register.model';
import { confirmPasswordValidator } from './validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication-common.scss', './register.component.scss'],
})
export class RegisterComponent {
  public readonly InputTypes = InputTypes;

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

  /**
   * @summary - Used to validate the form UI.
   *
   * @type {RegexPatterns}
   *
   * @public
   * @readonly
   */
  public readonly regexPatterns: RegexPatterns = {
    specialCharacters: /[$%&_@!]/,
    numbers: /\d/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    lengthLimit: /^.{5,15}$/,
    password: /^(?=.*[$%&_@!])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d$%&_@!]{5,15}$/,
    fullName: /^[aA-zZ\-\ ]{1,}$/,
  };

  public readonly registerForm: FormGroup = new FormGroup(
    {
      [InputTypes.FULL_NAME]: new FormControl('Grecu Alexandru', {
        validators: [Validators.required, Validators.pattern(this.regexPatterns.fullName)],
      }),
      [InputTypes.EMAIL]: new FormControl('grecualexandru001@gmail.com', {
        validators: [Validators.required, Validators.email],
      }),
      [InputTypes.PASSWORD]: new FormControl('Test123!', {
        validators: [Validators.required, Validators.pattern(this.regexPatterns.password)],
      }),
      [InputTypes.CONFIRM_PASSWORD]: new FormControl('Test123!', {
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

    // const RESPONSE = await this._authenticationService.signUp({
    //   email: this.registerForm.value[InputTypes.EMAIL],
    //   password: this.registerForm.value[InputTypes.CONFIRM_PASSWORD],
    //   options: {
    //     data: {
    //       [InputTypes.FULL_NAME]: this.registerForm.value[InputTypes.FULL_NAME],
    //     },
    //     emailRedirectTo: allRoutes.overview.path,
    //   },
    // });
    //
    // console.log(RESPONSE);

    // ***************
    this._overlayReference = this._snackbarService.open({
      type: SnackbarType.ERROR,
      message: `Some error occurred`,
    });

    this._initCloseSubscription();
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
