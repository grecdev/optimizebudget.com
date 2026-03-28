import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalCountCategoryComponent } from './total-count-category.component';
import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

@NgModule({
  declarations: [TotalCountCategoryComponent],
  imports: [
    CommonModule,
    //
    WidgetBoxModule,
  ],
  exports: [TotalCountCategoryComponent],
})
export class TotalCountCategoryModule {}
