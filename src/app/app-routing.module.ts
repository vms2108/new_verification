import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: '', canActivate: [AuthGuard], loadChildren: './verification/verification.module#VerificationModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
