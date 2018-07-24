import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { UsersService } from '../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue-info',
  templateUrl: 'queueInfo.component.html',
  styleUrls: ['queueInfo.component.scss']
})
export class QueueInfoComponent implements OnInit {
  returnUrl: string;
  private noQueue = true;
  private nextProcedure: string;

  constructor(private usersService: UsersService,
  private router: Router) {}
  @Language() lang: string;

  ngOnInit() {
    this.next();
  }

  get waitingVerificationCount() {
    return this.usersService.getWaitingVerification().length;
  }
  get waitingIdentificationTransactionCount() {
    return this.usersService.getWaitingTransactionIdentification().length;
  }
  get waitingIdentificationInitiativeCount() {
    return this.usersService.getWaitingInitiativeIdentification().length;
  }
  get waitingDealCount() {
    return this.usersService.getWaitingDeal().length;
  }
  next() {
    if (this.usersService.getWaitingVerification().length > 0) {
      this.nextProcedure = 'verification';
      setTimeout(() => { this.noQueue = false; });
    } else {
      if (this.usersService.getWaitingTransactionIdentification().length > 0 ||
      this.usersService.getWaitingInitiativeIdentification().length > 0) {
        this.nextProcedure = 'identification';
        setTimeout(() => { this.noQueue = false; });
      } else {
          this.nextProcedure = '';
      }
    }
  }
  redirectTo() {
    this.router.navigate(['/' + this.nextProcedure + '/form']);
  }
}
