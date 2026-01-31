import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTableModule } from '@shared/components/table/table.module';
import { PillStatusModule } from '@shared/components/pill-status/pill-status.module';
import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { TrackerTableComponent } from './tracker-table.component';

@NgModule({
  declarations: [TrackerTableComponent],
  imports: [CommonModule, AppTableModule, WidgetBoxModule, PillStatusModule],
  exports: [TrackerTableComponent],
})
export class TrackerTableModule {}
