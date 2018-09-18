import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'angular-l10n';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { VerificationService } from './services/verification.service';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  imports: [CommonModule, TranslationModule, MaterialModule, ReactiveFormsModule],
  declarations: [ImageViewerComponent, TimePipe],
  exports: [ImageViewerComponent, TimePipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [VerificationService]
    };
  }
}
