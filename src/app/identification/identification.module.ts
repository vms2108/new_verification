
import { NgModule } from '@angular/core';

import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentificationComponent } from './identification.component';
import { MaterialModule } from '../material/material.module';
import { TranslationModule } from 'angular-l10n';

@NgModule({
  declarations: [
    IdentificationComponent
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
  exports: [IdentificationComponent]
})
export class IdentificationModule {}
