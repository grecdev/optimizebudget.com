import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password.component';

const paths: Route[] = [
  {
    path: '',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(paths)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
