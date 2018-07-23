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
  private noQueue = false;

  constructor(private usersService: UsersService,
  private router: Router) {}
  @Language() lang: string;

  ngOnInit() {
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
  get word() {
    if (this.usersService.getWaitingVerification().length > 0) {
      return 'verification';
    } else {
      if (this.usersService.getWaitingTransactionIdentification().length > 0 ||
      this.usersService.getWaitingInitiativeIdentification().length > 0) {
        return 'identification';
      } else {
        this.noQueue = true;
        return '';
      }
    }
  }

  minuseOne() {
    this.usersService.updateUser(this.usersService.nextVerification());
  }
  next() {
    this.router.navigate(['/' + this.word + '/form']);
  }
}
