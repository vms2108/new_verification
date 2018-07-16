import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { FieldComponent } from './field/field.component';
import { ToggleComponent } from './toggle/toggle.component';
import { PhotoComponent } from './photo/photo.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    FieldComponent,
    ToggleComponent,
    PhotoComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    FieldComponent,
    ToggleComponent,
    PhotoComponent,
    ButtonComponent
  ]
})
export class FormModule {}
