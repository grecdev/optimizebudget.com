import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HeaderModule } from '@core/layout/header/header.module';
import { SidebarModule } from '@core/layout/sidebar/sidebar.module';
import { RouterContainerComponent } from '@core/layout/router-container/router-container.component';

import { HomeModule } from '@features/home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Remove
import { AppTableModule } from '@shared/components/table/table.module';

@NgModule({
  declarations: [AppComponent, RouterContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //
    HomeModule,
    HeaderModule,
    SidebarModule,
    // Remove
    AppTableModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
