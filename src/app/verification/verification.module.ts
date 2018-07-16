
import { NgModule } from '@angular/core';

import { VerificationComponent } from './verification.component';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    VerificationComponent
  ],
  imports: [
      FormModule,
      ReactiveFormsModule,
      CommonModule,
      MaterialModule
  ],
  providers: [],
  bootstrap: [],
  exports: [VerificationComponent]
})
export class VerificationModule {}
