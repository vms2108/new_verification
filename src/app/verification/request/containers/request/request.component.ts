import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Application, RequestFieldsGroup } from '../../../verification.models';
import { RequestService } from '../../services/request.service';
import { Subscription, Observable } from 'rxjs';
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

  public application: Application;
  public requestForm: FormGroup;
  public requestFields: RequestFieldsGroup[];
  public splittedPhoto$: Observable<string>;

  constructor(
    private requestService: RequestService,
    private verificationService: VerificationService,
    private router: Router
  ) {}

  ngOnInit() {
    const nextRequest$ = this.verificationService.nextRequest$;
    this.subscription = nextRequest$.subscribe(this.nextRequestChanged.bind(this));
    this.splittedPhoto$ = this.requestService.splittedPhoto$;
  }

  nextRequestChanged(res: Application | false) {
    if (res === undefined) {
      return (this.loading = true);
    }
    this.loading = false;
    if (res && res.id) {
      this.getForm(res);
    } else {
      this.router.navigate(['/']);
    }
  }

  getForm(res: Application) {
    this.application = { ...res };
    const { form, fields } = this.requestService.generateForm(this.application);
    this.requestForm = form;
    this.requestFields = fields;
    this.requestForm.updateValueAndValidity();
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.verificationService.clearNextRequest();
  }
}
