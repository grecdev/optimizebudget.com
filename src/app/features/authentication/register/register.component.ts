import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { allRoutes } from '@script/globalData';

import { type RegexPatterns, InputTypes } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication-common.scss', './register.component.scss'],
})
export class RegisterComponent {
  public readonly InputTypes = InputTypes;

  public paths: Pick<typeof allRoutes, 'login'> = {
    login: allRoutes.login,
  };

  public readonly regexPatterns: RegexPatterns = {
    specialCharacters: /[$%&_@!]/,
    numbers: /\d/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    lengthLimit: /^.{5,15}$/,
    password: /^(?=.*[$%&_@!])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d$%&_@!]{5,15}$/,
  };

  public readonly registerForm: FormGroup = new FormGroup({
    [InputTypes.FULL_NAME]: new FormControl('', {
      validators: [Validators.required],
    }),
    [InputTypes.EMAIL]: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    [InputTypes.PASSWORD]: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.regexPatterns.password)],
    }),
    [InputTypes.CONFIRM_PASSWORD]: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  public handleSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
  }
}
