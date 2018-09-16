import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'angular-l10n';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationsService } from './services/applications.service';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';

@NgModule({
  imports: [CommonModule, TranslationModule, MaterialModule, ReactiveFormsModule],
  declarations: [ImageViewerComponent],
  exports: [ImageViewerComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ApplicationsService]
    };
  }
}
