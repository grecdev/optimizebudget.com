import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HeaderModule } from '@core/layout/header/header.module';
import { SidebarModule } from '@core/layout/sidebar/sidebar.module';

import { HomeModule } from '@features/home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //
    HomeModule,
    HeaderModule,
    SidebarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
