import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Localization
import { TranslationModule, L10nLoader } from 'angular-l10n';
import { l10nConfig } from './l10nConfig';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Modules
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, HttpClientModule, TranslationModule.forRoot(l10nConfig)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
