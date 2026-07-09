import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { allRoutes } from '@script/globalData';

import { type RegexPatterns, InputTypes } from './register.model';

import { confirmPasswordValidator } from './validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication-common.scss', './register.component.scss'],
})
export class RegisterComponent {
  public readonly InputTypes = InputTypes;

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
      [InputTypes.FULL_NAME]: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.regexPatterns.fullName)],
      }),
      [InputTypes.EMAIL]: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      [InputTypes.PASSWORD]: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.regexPatterns.password)],
      }),
      [InputTypes.CONFIRM_PASSWORD]: new FormControl('', {
        validators: [Validators.required],
      }),
    },
    {
      validators: confirmPasswordValidator(),
    }
  );

  public handleSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
  }
}
