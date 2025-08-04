import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderModule } from '@core/layout/header/header.module';

import { HomeModule } from '@features/home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, HeaderModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
