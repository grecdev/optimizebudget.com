import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridCalendarComponent } from './grid-calendar.component';

@NgModule({
  declarations: [GridCalendarComponent],
  imports: [CommonModule],
  exports: [GridCalendarComponent],
})
export class GridCalendarModule {}
