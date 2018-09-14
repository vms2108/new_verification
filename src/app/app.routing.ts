import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationComponent } from './verification/verification.component';
import { IdentificationComponent } from './identification/identification.component';
import { AuthGuard } from './core/guards';
import { LoginComponent } from './login';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'verification/form', component: VerificationComponent, canActivate: [AuthGuard] },
  { path: 'identification/form', component: IdentificationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
