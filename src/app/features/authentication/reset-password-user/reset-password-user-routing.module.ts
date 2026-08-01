import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordUserComponent } from './reset-password-user.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordUserComponent,
    outlet: 'authentication',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordUserRoutingModule {}
