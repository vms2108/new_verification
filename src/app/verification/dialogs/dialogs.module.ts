import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RequestConfirmComponent } from './components/request-confirm/request-confirm.component';
import { TranslationModule } from 'angular-l10n';

@NgModule({
  imports: [MaterialModule, TranslationModule],
  declarations: [RequestConfirmComponent],
  exports: [RequestConfirmComponent],
  entryComponents: [RequestConfirmComponent]
})
export class DialogsModule {}
