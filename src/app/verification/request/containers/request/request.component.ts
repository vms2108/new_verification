import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Application } from '../../../verification.models';
import { RequestService } from '../../services/request.service';
import { Subscription } from 'rxjs';
import { VerificationService } from '../../../shared/services/verification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: 'request.component.html',
  styleUrls: ['request.component.scss']
})
export class RequestComponent implements OnInit, OnDestroy {
  public loading = true;

  private subscription: Subscription;

  public identificationForm: FormGroup;
  public application: Application;

  constructor(
    private requestService: RequestService,
    private verificationService: VerificationService,
    private router: Router
  ) {}

  ngOnInit() {
    const nextRequest$ = this.verificationService.nextRequest$;
    this.subscription = nextRequest$.subscribe(this.nextRequestChanged.bind(this));
  }

  nextRequestChanged(res: Application | false) {
    if (res === undefined) {
      return (this.loading = true);
    }
    this.loading = false;
    if (res && res.id) {
      this.application = res;
      this.identificationForm = this.requestService.generateForm(res);
      this.identificationForm.updateValueAndValidity();
      window.scrollTo(0, 0);
      return;
    }
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.verificationService.clearNextRequest();
  }
}
