import { ButtonComponent } from './form/button/button.component';
import { FieldComponent } from './form/field/field.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VerificationComponent } from './verification/verification.component';
import { MainComponent } from './main/main.component';
import { IdentificationComponent } from './identification/identification.component';
import { HistoryVerificationComponent } from './history-verification/history-verification.component';
import { HistoryIdentificationComponent } from './history-identification/history-identification.component';
import { AppRoutingModule } from './app.routing';
import { ToggleComponent } from './form/toggle/toggle.component';
import { PhotoComponent } from './form/photo/photo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login';
import { CoreModule } from './core/core.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

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
    LoginComponent
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
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
