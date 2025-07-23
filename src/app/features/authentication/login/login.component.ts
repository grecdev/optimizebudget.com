import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { allRoutes } from '@script/globalData';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['../authentication-common.scss', './login.component.scss'],
})
export class LoginComponent {
  paths: Pick<typeof allRoutes, 'register'> = {
    register: allRoutes.register,
  };

  handleLogin(form: NgForm) {
    console.log(form);
  }
}
