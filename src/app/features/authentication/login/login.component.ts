import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { allRoutes } from '@script/globalData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication-common.scss', './login.component.scss'],
})
export class LoginComponent {
  paths: Pick<typeof allRoutes, 'register' | 'forgotPassword'> = {
    register: allRoutes.register,
    forgotPassword: allRoutes.forgotPassword,
  };

  handleLogin(form: NgForm) {
    console.log(form);
  }
}
