import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { DayOfWeekPipe } from './pipes/dayOfWeek/day-of-week.pipe';

import { GridCalendarComponent } from './grid-calendar.component';

@NgModule({
  declarations: [GridCalendarComponent, DayOfWeekPipe],
  imports: [
    // Angular specific
    CommonModule,
    DatePipe,
    // App specific
    WidgetBoxModule,
  ],
  exports: [GridCalendarComponent],
})
export class GridCalendarModule {}
