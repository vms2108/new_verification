import { NgModule } from '@angular/core';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HistoryVerificationComponent } from './history-verification.component';
import { CoreModule } from '../core/core.module';
import { TranslationModule } from 'angular-l10n';

@NgModule({
  declarations: [
    HistoryVerificationComponent
  ],
  imports: [
      FormModule,
      ReactiveFormsModule,
      CommonModule,
      MaterialModule,
      CoreModule,
      TranslationModule
  ],
  providers: [],
  bootstrap: [],
  exports: [
    HistoryVerificationComponent
  ]
})
export class HistoryVerificationModule {}
