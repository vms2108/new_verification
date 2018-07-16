import { HistoryVerificationService } from './services/history-verification.service';
import { NgModule } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthGuard, UsersService, ApiService, AuthService, HistoryVerificationService],
  bootstrap: [],
  exports: []
})
export class CoreModule {}
