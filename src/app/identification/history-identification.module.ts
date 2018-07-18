import { NgModule } from '@angular/core';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HistoryIdentificationComponent } from '../history-identification/history-identification.component';


@NgModule({
  declarations: [
    HistoryIdentificationComponent
  ],
  imports: [
      FormModule,
      ReactiveFormsModule,
      CommonModule,
      MaterialModule
  ],
  providers: [],
  bootstrap: [],
  exports: [HistoryIdentificationComponent]
})
export class HistoryIdentificationModule {}
