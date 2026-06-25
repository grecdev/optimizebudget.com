import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxComponent } from './widget-box.component';
import { AppWidgetBoxHeader, AppWidgetBoxTitle, AppWidgetBoxTitleInfo } from './shared.components';

@NgModule({
  declarations: [WidgetBoxComponent, AppWidgetBoxHeader, AppWidgetBoxTitle, AppWidgetBoxTitleInfo],
  imports: [CommonModule],
  exports: [WidgetBoxComponent, AppWidgetBoxHeader, AppWidgetBoxTitle, AppWidgetBoxTitleInfo],
})
export class WidgetBoxModule {}
