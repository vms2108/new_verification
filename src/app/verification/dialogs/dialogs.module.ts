import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RequestConfirmComponent } from './components/request-confirm/request-confirm.component';
import { TranslationModule } from 'angular-l10n';
import { RequestErrorComponent } from './components/request-error/request-error.component';

@NgModule({
  imports: [MaterialModule, TranslationModule],
  declarations: [RequestConfirmComponent, RequestErrorComponent],
  exports: [RequestConfirmComponent, RequestErrorComponent],
  entryComponents: [RequestConfirmComponent, RequestErrorComponent]
})
export class DialogsModule {}
