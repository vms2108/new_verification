import { NgModule } from '@angular/core';
import { HeaderLangComponent } from './header-lang.component';
import { TranslationModule } from 'angular-l10n';

@NgModule({
  imports: [TranslationModule],
  declarations: [
    HeaderLangComponent
  ],
  providers: [],
  exports: [
    HeaderLangComponent
  ]
})
export class HeaderLangModule {

}

