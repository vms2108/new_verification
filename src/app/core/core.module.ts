import { HistoryVerificationService } from './services/history-verification.service';
import { NgModule } from '@angular/core';
import { AlertService } from './services';
import { UsersService } from './services/users.service';
import { AuthGuard } from './guards/auth.guard';
import { AlertComponent } from './directives';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule],
  providers: [AuthGuard, AlertService, UsersService, ApiService, AuthService, HistoryVerificationService],
  bootstrap: [],
  exports: [AlertComponent]
})
export class CoreModule {}
