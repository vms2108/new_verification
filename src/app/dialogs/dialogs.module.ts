import { NgModule } from '@angular/core';
import { IndetificationConfirmComponent } from './indetification-confirm/indetification-confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslationModule } from 'angular-l10n';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    TranslationModule
  ],
  declarations: [IndetificationConfirmComponent],
  exports: [IndetificationConfirmComponent],
  entryComponents: [IndetificationConfirmComponent]
})
export class DialogsModule {}
