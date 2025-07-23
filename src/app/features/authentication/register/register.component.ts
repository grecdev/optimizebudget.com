import { Component } from '@angular/core';

import { allRoutes } from '@script/globalData';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication-common.scss', './register.component.scss'],
})
export class RegisterComponent {
  paths: Pick<typeof allRoutes, 'login'> = {
    login: allRoutes.login,
  };

  handleRegister(form: NgForm) {
    console.log(form);
  }
}
