import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login';

import { CoreModule } from './core/core.module';
import { DialogsModule } from './dialogs/dialogs.module';

import { FormModule } from './form/form.module';
import { MaterialModule } from './material/material.module';
import { VerificationModule } from './verification/verification.module';
import { IdentificationModule } from './identification/identification.module';
import { HistoryVerificationModule } from './history-verification/history-verification.module';
import { HistoryIdentificationModule } from './identification/history-identification.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogsModule,
    FormModule,
    VerificationModule,
    IdentificationModule,
    HistoryVerificationModule,
    HistoryIdentificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
