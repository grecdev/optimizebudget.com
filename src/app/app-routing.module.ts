import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { allRoutes } from '@script/globalData';

const routes: Routes = [
  {
    path: allRoutes.login.path,
    loadChildren: () =>
      import('./features/authentication/login/login.module').then((module) => module.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
