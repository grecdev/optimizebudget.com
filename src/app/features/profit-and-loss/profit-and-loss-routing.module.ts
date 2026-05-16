import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfitAndLossComponent } from './profit-and-loss.component';

const routes: Routes = [{ path: '', component: ProfitAndLossComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfitAndLossRoutingModule {}
