import { NgModule } from '@angular/core';

import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentificationComponent } from './identification.component';
import { MaterialModule } from '../material/material.module';
import { TranslationModule } from 'angular-l10n';
import { HistoryIdentificationComponent } from '../history-identification/history-identification.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [IdentificationComponent, HistoryIdentificationComponent],
  imports: [FormModule, ReactiveFormsModule, CommonModule, MaterialModule, TranslationModule, CoreModule],
  providers: [],
  bootstrap: [],
  exports: [IdentificationComponent],
  entryComponents: [IdentificationComponent]
})
export class IdentificationModule {}
