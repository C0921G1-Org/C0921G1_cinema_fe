import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';

import {LoadCssService} from './loadCss/load-css-service.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MemberManagementModule} from "./member-management/member-management.module";
import {NgxPayPalModule} from "ngx-paypal";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
 NgxPayPalModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  MemberManagementModule
  ],
  providers: [
    LoadCssService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
