import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TranslationModule } from 'angular-l10n';
import { MaterialModule } from '../../material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { DialogsModule } from '../dialogs/dialogs.module';

// Containers
import { RequestComponent } from './containers/request/request.component';

// Components
import { RequestBigImageComponent } from './components/request-big-image/request-big-image.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { RequestFormTogglerComponent } from './components/request-form-toggler/request-form-toggler.component';
import { RequestFormSectionComponent } from './components/request-form-group/request-form-section.component';
import { RequestFormPhotoComponent } from './components/request-form-photo/request-form-photo.component';
import { RequestFormTextComponent } from './components/request-form-text/request-form-text.component';
import { RequestLayoutComponent } from './components/request-layout/request-layout.component';
import { RequestHeaderComponent } from './components/request-header/request-header.component';
import { RequestService } from './services/request.service';

const routes: Routes = [{ path: '', component: RequestComponent }, { path: '**', redirectTo: '' }];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    TranslationModule,
    RouterModule.forChild(routes),
    DialogsModule
  ],
  declarations: [
    RequestComponent,
    RequestFormComponent,
    RequestFormTogglerComponent,
    RequestFormSectionComponent,
    RequestFormPhotoComponent,
    RequestFormTextComponent,
    RequestFormTogglerComponent,
    RequestLayoutComponent,
    RequestBigImageComponent,
    RequestHeaderComponent
  ],
  providers: [RequestService]
})
export class RequestModule {}
