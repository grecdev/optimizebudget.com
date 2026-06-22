import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCardComponent } from './card.component';

import { AppCardRow, AppCardKey, AppCardValue } from './shared.component';

@NgModule({
  declarations: [AppCardComponent, AppCardRow, AppCardKey, AppCardValue],
  imports: [CommonModule],
  exports: [AppCardComponent, AppCardRow, AppCardKey, AppCardValue],
})
export class AppCardModule {}
