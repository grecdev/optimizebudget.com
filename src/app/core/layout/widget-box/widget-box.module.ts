import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetBoxComponent } from './widget-box.component';

@NgModule({
  declarations: [WidgetBoxComponent],
  imports: [CommonModule],
  exports: [WidgetBoxComponent],
})
export class WidgetBoxModule {}
