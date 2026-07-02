import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canDeactivateAuthenticationGuard } from '@core/authentication/route-guards/can-deactivate-authentication.guard';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    outlet: 'authentication',
    canDeactivate: [canDeactivateAuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
