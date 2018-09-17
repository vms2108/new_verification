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

  @Language()
  lang: string;

  constructor(private router: Router, private verificationService: VerificationService) {}

  ngOnInit() {
    const nextRequest$ = this.verificationService.nextRequest$;
    this.subscription = nextRequest$.subscribe(this.nextRequestChanged.bind(this));
  }

  searchRequests() {
    this.verificationService.searchRequests();
  }

  nextRequestChanged(res: Application | false) {
    if (res === undefined) {
      return (this.loading = true);
    }
    this.loading = false;
    if (res && res.id) {
      this.router.navigate(['/request']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
