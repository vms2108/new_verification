// Imported Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationModule } from 'angular-l10n';

// Containers
import { LayoutComponent } from './containers/layout/layout.component';
import { HeaderComponent } from './containers/header/header.component';

// Components
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';

@NgModule({
  imports: [CommonModule, TranslationModule, RouterModule],
  declarations: [LayoutComponent, HeaderComponent, MobileMenuComponent, LangSelectorComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
