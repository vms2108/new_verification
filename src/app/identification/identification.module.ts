
import { NgModule } from '@angular/core';

import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentificationComponent } from './identification.component';

@NgModule({
  declarations: [
    IdentificationComponent
  ],
  imports: [
      FormModule,
      ReactiveFormsModule,
      CommonModule
  ],
  providers: [],
  bootstrap: [],
  exports: [IdentificationComponent]
})
export class IdentificationModule {}
