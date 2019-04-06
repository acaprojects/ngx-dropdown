import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DropdownModule } from '../../lib/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
