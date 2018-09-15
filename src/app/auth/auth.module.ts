import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from 'angular-l10n';
import { MaterialModule } from '../material/material.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, TranslationModule, MaterialModule],
  declarations: [LoginComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthGuard, AuthService]
    };
  }
}
