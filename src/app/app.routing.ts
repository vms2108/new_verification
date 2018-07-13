import { HistoryIdentificationComponent } from './history-identification/history-identification.component';
import { HistoryVerificationComponent } from './history-verification/history-verification.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationComponent } from './verification/verification.component';
import { IdentificationComponent } from './identification/identification.component';
import { AuthGuard } from './core/guards';
import { LoginComponent } from './login';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'verification', component: VerificationComponent, canActivate: [AuthGuard] },
  { path: 'identification', component: IdentificationComponent, canActivate: [AuthGuard]},
  { path: 'history/verification', component: HistoryVerificationComponent, canActivate: [AuthGuard] },
  { path: 'history/identification', component: HistoryIdentificationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
