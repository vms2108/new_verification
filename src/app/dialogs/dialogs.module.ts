import { NgModule } from '@angular/core';
import { IndetificationConfirmComponent } from './indetification-confirm/indetification-confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [IndetificationConfirmComponent],
  exports: [IndetificationConfirmComponent],
  entryComponents: [IndetificationConfirmComponent]
})
export class DialogsModule {}
