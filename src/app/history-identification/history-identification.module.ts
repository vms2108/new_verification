import { NgModule } from '@angular/core';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HistoryIdentificationComponent } from './history-identification.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    HistoryIdentificationComponent,
  ],
  imports: [
      CoreModule,
      FormModule,
      ReactiveFormsModule,
      CommonModule,
      MaterialModule
  ],
  providers: [],
  bootstrap: [],
  exports: [
    HistoryIdentificationComponent,
  ]
})
export class HistoryIdentificationModule {}