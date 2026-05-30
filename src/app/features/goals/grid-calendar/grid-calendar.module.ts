import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { GridCalendarComponent } from './grid-calendar.component';

@NgModule({
  declarations: [GridCalendarComponent],
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
