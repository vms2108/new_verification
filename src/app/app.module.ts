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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login';
import { CoreModule } from './core/core.module';

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
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      CoreModule
   ],
   providers: [
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
