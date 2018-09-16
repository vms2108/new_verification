import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Localization
import { TranslationModule, L10nLoader } from 'angular-l10n';
import { l10nConfig } from './l10nConfig';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Modules
import { LayoutModule } from './layout/layout.module';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';

// Component
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslationModule.forRoot(l10nConfig),
    ApiModule.forRoot(),
    AuthModule.forRoot(),
    LayoutModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
