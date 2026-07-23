import { Directive, forwardRef, Input } from '@angular/core';

import {
  type ValidationErrors,
  type Validator,
  type AbstractControl,
  NG_VALIDATORS,
} from '@angular/forms';

import { InputTypes } from './reset-password-user.model';

@Directive({
  selector: '[appConfirmPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ConfirmPasswordValidatorDirective),
      multi: true,
    },
  ],
})
export class ConfirmPasswordValidatorDirective implements Validator {
  @Input({ required: true }) passwordControl: string = '';
  @Input({ required: true }) confirmPasswordControl: string = '';

  /**
   * @summary - General key for error name.
   *
   * @type {string}
   *
   * @private
   * @readonly
   */
  private readonly errorKey: string = 'passwordMismatch';

  /**
   * @summary - Required in FormGroup to set custom errors.
   *
   * @type {
   *   {
   *     [key: string]: boolean
   *   }
   * }
   *
   * @private
   * @readonly
   */
  private readonly errorData: {
    [key: string]: boolean;
  } = {
    [this.errorKey]: true,
  };

  validate(group: AbstractControl): ValidationErrors | null {
    const PASSWORD_CONTROL = group.get(InputTypes.PASSWORD);
    const CONFIRM_PASSWORD_CONTROL = group.get(InputTypes.CONFIRM_PASSWORD);

    if (!PASSWORD_CONTROL || !CONFIRM_PASSWORD_CONTROL) {
      return null;
    }

    if (group.errors && !group.errors[this.errorKey]) {
      return null;
    }

    if (PASSWORD_CONTROL.value !== CONFIRM_PASSWORD_CONTROL.value) {
      CONFIRM_PASSWORD_CONTROL.setErrors(this.errorData);

      return this.errorData;
    }

    CONFIRM_PASSWORD_CONTROL.setErrors(null);

    return null;
  }
}
