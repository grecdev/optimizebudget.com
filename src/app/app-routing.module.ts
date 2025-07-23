import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { allRoutes } from '@script/globalData';

const routes: Routes = [
  {
    path: allRoutes.login.path,
    loadChildren: () =>
      import('./features/authentication/login/login.module').then(module => module.LoginModule),
  },
  {
    path: allRoutes.register.path,
    loadChildren: () =>
      import('./features/authentication/register/register.module').then(
        module => module.RegisterModule
      ),
  },
  {
    path: allRoutes.forgotPassword.path,
    loadChildren: () =>
      import('./features/authentication/forgot-password/forgot-password.module').then(
        module => module.ForgotPasswordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
