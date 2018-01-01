import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { FieldComponent } from './field/field.component';
import { ToggleComponent } from './toggle/toggle.component';
import { PhotoComponent } from './photo/photo.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { AppComponent } from '../app.component';
import { TranslationModule } from 'angular-l10n';
import { QueueInfoComponent } from './queueInfo/queueInfo.component';

@NgModule({
  declarations: [FieldComponent, ToggleComponent, PhotoComponent, ButtonComponent, QueueInfoComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, TranslationModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FieldComponent, ToggleComponent, PhotoComponent, ButtonComponent, QueueInfoComponent]
})
export class FormModule {}
