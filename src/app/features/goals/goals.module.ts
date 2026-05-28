import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GridCalendarModule } from './grid-calendar/grid-calendar.module';

import { GoalsComponent } from './goals.component';

@NgModule({
  declarations: [GoalsComponent],
  imports: [
    // Angular specific
    CommonModule,
    // App specific
    GoalsRoutingModule,
    GridCalendarModule,
  ],
})
export class GoalsModule {}
