import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { allRoutes } from '@script/globalData';

import { InputTypes } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication-common.scss', './login.component.scss'],
})
export class LoginComponent {
  public readonly InputTypes = InputTypes;

  /**
   * @summary - To navigate.
   *
   * @type {Pick<typeof allRoutes, 'register' | 'forgotPassword'>}
   *
   * @public
   * @readonly
   */
  public readonly paths: Pick<typeof allRoutes, 'register' | 'forgotPassword'> = {
    register: allRoutes.register,
    forgotPassword: allRoutes.forgotPassword,
  };

  public readonly loginForm: Record<InputTypes, string> = {
    [InputTypes.EMAIL]: '',
    [InputTypes.PASSWORD]: '',
  };

  public loginLoading: boolean = false;

  handleLogin(data: NgForm) {
    if (data.invalid) {
      return;
    }

    console.log(data);

    this.loginLoading = true;
  }
}
