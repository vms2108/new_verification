import { NgModule } from '@angular/core';

import { VerificationComponent } from './verification.component';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TranslationModule } from 'angular-l10n';
import { HistoryVerificationComponent } from '../history-verification/history-verification.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [VerificationComponent, HistoryVerificationComponent],
  imports: [FormModule, ReactiveFormsModule, CommonModule, MaterialModule, TranslationModule, CoreModule],
  providers: [],
  bootstrap: [],
  exports: [VerificationComponent],
  entryComponents: [VerificationComponent]
})
export class VerificationModule {}
