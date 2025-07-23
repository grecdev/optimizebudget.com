import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { allRoutes } from '@script/globalData';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../authentication-common.scss', './forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  paths: Pick<typeof allRoutes, 'login'> = {
    login: allRoutes.login,
  };

  handleForgotPasswordSubmit(form: NgForm) {}
}
