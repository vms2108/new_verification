import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'angular-l10n';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services';

@Component({
  selector: 'app-queue-info',
  templateUrl: 'queueInfo.component.html',
  styleUrls: ['queueInfo.component.scss']
})
export class QueueInfoComponent implements OnInit {
  public returnUrl: string;
  public noQueue = true;
  public nextProcedure: string;

  public marginTop = false;

  @Input()
  set mtop(value: any) {
    this.marginTop = true;
  }

  constructor(private usersService: UsersService, private router: Router) {}
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
      setTimeout(() => {
        this.noQueue = false;
      });
    } else {
      if (
        this.usersService.getWaitingTransactionIdentification().length > 0 ||
        this.usersService.getWaitingInitiativeIdentification().length > 0
      ) {
        this.nextProcedure = 'identification';
        setTimeout(() => {
          this.noQueue = false;
        });
      } else {
        this.nextProcedure = '';
      }
    }
  }
  redirectTo() {
    this.router.navigate(['/' + this.nextProcedure + '/form']);
  }
}
