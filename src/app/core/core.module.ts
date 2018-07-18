import { StatusPipe } from './pipes/status.pipe';
import { VerificationService } from './services/verification.service';
import { NgModule } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { IdentificationService } from './services/identification.service';
import { IdentificationCausePipe } from './pipes/identification-cause.pipe';

@NgModule({
  declarations: [
    IdentificationCausePipe,
    StatusPipe
  ],
  imports: [CommonModule],
  providers: [AuthGuard, UsersService, ApiService, AuthService, VerificationService, IdentificationService],
  bootstrap: [],
  exports: [
    IdentificationCausePipe,
    StatusPipe
  ]
})
export class CoreModule {}
