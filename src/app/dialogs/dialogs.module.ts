import { NgModule } from '@angular/core';
import { IndetificationConfirmComponent } from './indetification-confirm/indetification-confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslationModule } from 'angular-l10n';
import { TableDetailsComponent } from './table-details/table-details.component';
import { IdentificationModule } from '../identification/identification.module';
import { VerificationModule } from '../verification/verification.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, TranslationModule, IdentificationModule, VerificationModule],
  declarations: [IndetificationConfirmComponent, TableDetailsComponent],
  exports: [IndetificationConfirmComponent],
  entryComponents: [IndetificationConfirmComponent, TableDetailsComponent]
})
export class DialogsModule {}
