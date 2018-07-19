
import { NgModule } from '@angular/core';

import { VerificationComponent } from './verification.component';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TranslationModule } from 'angular-l10n';

@NgModule({
  declarations: [
    VerificationComponent
  ],
  imports: [
      FormModule,
      ReactiveFormsModule,
      CommonModule,
      MaterialModule,
      TranslationModule
  ],
  providers: [],
  bootstrap: [],
  exports: [VerificationComponent]
})
export class VerificationModule {}
