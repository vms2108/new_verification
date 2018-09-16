// Imported Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationModule } from 'angular-l10n';

// Containers
import { LayoutComponent } from './containers/layout/layout.component';
import { HeaderComponent } from './containers/header/header.component';

// Components
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';
import { ImageModalViewerComponent } from './components/image-modal-viewer/image-modal-viewer.component';
import { SharedModule } from '../verification/shared/shared.module';
import { LayoutService } from './services/layout.service';

@NgModule({
  imports: [CommonModule, TranslationModule, RouterModule, SharedModule],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MobileMenuComponent,
    LangSelectorComponent,
    ImageModalViewerComponent
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LayoutModule,
      providers: [LayoutService]
    };
  }
}
