import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppIconModule } from '@shared/components/icon/icon.module';
import { WidgetBoxModule } from '@core/layout/widget-box/widget-box.module';

import { TotalCountCategoryComponent } from './total-count-category.component';

@NgModule({
  declarations: [TotalCountCategoryComponent],
  imports: [
    CommonModule,
    //
    WidgetBoxModule,
    AppIconModule,
  ],
  exports: [TotalCountCategoryComponent],
})
export class TotalCountCategoryModule {}
