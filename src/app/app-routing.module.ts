import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { allRoutes } from '@script/globalData';
import { RouteSnapshotData } from '@shared/models/interfaces';

import { CanActivateAuthenticationGuard } from '@core/authentication/route-guards/can-activate-authentication.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: allRoutes.overview.path,
        loadChildren: () => import('./features/home/home.module').then(module => module.HomeModule),
        canActivate: [CanActivateAuthenticationGuard],
      },
      {
        path: allRoutes.expenses.path,
        loadChildren: () =>
          import('./features/expenses/expenses.module').then(module => module.ExpensesModule),
        canActivate: [CanActivateAuthenticationGuard],
      },
      {
        path: allRoutes.profitAndLoss.path,
        loadChildren: () =>
          import('./features/profit-and-loss/profit-and-loss.module').then(
            module => module.ProfitAndLossModule
          ),
        canActivate: [CanActivateAuthenticationGuard],
      },
      {
        path: allRoutes.goals.path,
        loadChildren: () =>
          import('./features/goals/goals.module').then(module => module.GoalsModule),
        canActivate: [CanActivateAuthenticationGuard],
      },
      {
        path: allRoutes.confirmEmail.path,
        loadChildren: () =>
          import('./features/authentication/confirm-email/confirm-email.module').then(
            m => m.ConfirmEmailModule
          ),
        data: {
          authenticationPage: true,
        } as RouteSnapshotData,
        canActivate: [CanActivateAuthenticationGuard],
      },
    ],
  },
  {
    path: allRoutes.login.path,
    loadChildren: () =>
      import('./features/authentication/login/login.module').then(module => module.LoginModule),
    data: {
      authenticationPage: true,
    } as RouteSnapshotData,
  },
  {
    path: allRoutes.register.path,
    loadChildren: () =>
      import('./features/authentication/register/register.module').then(
        module => module.RegisterModule
      ),
    data: {
      authenticationPage: true,
    } as RouteSnapshotData,
  },
  {
    path: allRoutes.resetPassword.path,
    loadChildren: () =>
      import('./features/authentication/forgot-password/forgot-password.module').then(
        module => module.ForgotPasswordModule
      ),
    data: {
      authenticationPage: true,
    } as RouteSnapshotData,
  },
  {
    path: allRoutes.resetPasswordUser.path,
    loadChildren: () =>
      import('./features/authentication/reset-password-user/reset-password-user.module').then(
        m => m.ResetPasswordUserModule
      ),
    data: {
      authenticationPage: true,
    } as RouteSnapshotData,
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
