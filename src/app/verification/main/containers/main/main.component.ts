import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from 'angular-l10n';
import { VerificationService } from '../../../shared/services/verification.service';
import { Subscription } from 'rxjs';
import { Application } from '../../../verification.models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public loading = false;

  public btnClicked = false;
  public noNewRequests = false;
  public timer = 0;

  @Language()
  lang: string;

  constructor(private router: Router, private verificationService: VerificationService) {}

  ngOnInit() {
    const nextRequest$ = this.verificationService.nextRequest$;
    this.subscription = nextRequest$.subscribe(this.nextRequestChanged.bind(this));
  }

  searchRequests() {
    console.log('search request', this.btnClicked);
    if (this.btnClicked) {
      return;
    }
    this.btnClicked = true;
    this.verificationService.searchRequests();
  }

  nextRequestChanged(res: Application | null) {
    if (res === undefined) {
      return (this.loading = true);
    }
    if (res && res.id) {
      return this.router.navigate(['/request']);
    }
    this.loading = false;
    if (res === null && this.btnClicked) {
      this.btnClicked = false;
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startTimer() {
    this.timer = 11;
    this.noNewRequests = true;
    const count = () => {
      this.timer--;
      if (this.timer > 0) {
        return setTimeout(() => count(), 1000);
      }
      this.noNewRequests = false;
      this.btnClicked = false;
    };
    count();
  }
}
