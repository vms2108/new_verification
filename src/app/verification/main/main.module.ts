import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './containers/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslationModule } from 'angular-l10n';

const routes: Routes = [{ path: '', component: MainComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), TranslationModule],
  declarations: [MainComponent]
})
export class MainModule {}
