import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { allRoutes } from '@script/globalData';

import { CanActivateAuthenticationGuard } from '@core/authentication/route-guards/can-activate-authentication.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [CanActivateAuthenticationGuard],
    children: [
      {
        path: allRoutes.overview.path,
        loadChildren: () => import('./features/home/home.module').then(module => module.HomeModule),
      },
      {
        path: allRoutes.expenses.path,
        loadChildren: () =>
          import('./features/expenses/expenses.module').then(module => module.ExpensesModule),
      },
      {
        path: allRoutes.profitAndLoss.path,
        loadChildren: () =>
          import('./features/profit-and-loss/profit-and-loss.module').then(
            module => module.ProfitAndLossModule
          ),
      },
      {
        path: allRoutes.goals.path,
        loadChildren: () =>
          import('./features/goals/goals.module').then(module => module.GoalsModule),
      },
    ],
  },
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
  // {
  //   path: '**',
  //   loadChildren: () =>
  //     import('./features/not-found/not-found.module').then(module => module.NotFoundModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
