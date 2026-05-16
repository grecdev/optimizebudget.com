import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitAndLossRoutingModule } from './profit-and-loss-routing.module';
import { ProfitAndLossComponent } from './profit-and-loss.component';

@NgModule({
  declarations: [ProfitAndLossComponent],
  imports: [CommonModule, ProfitAndLossRoutingModule],
})
export class ProfitAndLossModule {}
