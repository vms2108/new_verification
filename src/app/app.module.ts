import { ButtonComponent } from './form/button/button.component';
import { FieldComponent } from './form/field/field.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { VerificationComponent } from './verification/verification.component';
import { MainComponent } from './main/main.component';
import { IdentificationComponent } from './identification/identification.component';
import { HistoryVerificationComponent } from './history-verification/history-verification.component';
import { HistoryIdentificationComponent } from './history-identification/history-identification.component';
import { LoginComponent } from './login';

import { ToggleComponent } from './form/toggle/toggle.component';
import { PhotoComponent } from './form/photo/photo.component';

import { CoreModule } from './core/core.module';
import { DialogsModule } from './dialogs/dialogs.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FieldNoneToggleComponent } from './form/field-none-toggle/field-none-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    VerificationComponent,
    MainComponent,
    IdentificationComponent,
    HistoryVerificationComponent,
    HistoryIdentificationComponent,
    FieldComponent,
    ToggleComponent,
    PhotoComponent,
    ButtonComponent,
    LoginComponent,
    FieldNoneToggleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
