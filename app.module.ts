import { AppDateAdapter } from './date.adapter';
import { DemoMaterialModule } from './../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateAdapter, MatNativeDateModule } from '@angular/material';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    MatNativeDateModule],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter }],
  bootstrap: [AppComponent],
})
export class AppModule { }
