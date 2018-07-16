
import { NgModule } from '@angular/core';

import { VerificationComponent } from './verification.component';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    VerificationComponent
  ],
  imports: [
      FormModule,
      ReactiveFormsModule,
      CommonModule
  ],
  providers: [],
  bootstrap: [],
  exports: [VerificationComponent]
})
export class VerificationModule {}
