import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLoaderComponent } from './loader.component';

@NgModule({
  declarations: [AppLoaderComponent],
  imports: [CommonModule],
  exports: [AppLoaderComponent],
})
export class AppLoaderModule {}
