import { Injectable } from '@angular/core';
import { ApiService } from '../../../api/services/api.service';
import { identificationRequest } from '../../request/containers/request/identification-request';
import { LayoutService } from '../../../layout/services/layout.service';

import { BehaviorSubject, Observable, Observer, timer, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { random } from 'lodash';

import { IdentificatonRequest, VerificationRequest, Application } from '../../verification.models';

@Injectable()
export class VerificationService {
  private timer: Subscription;
  public nextRequest$ = new BehaviorSubject<Application | false>(false);

  constructor(private apiService: ApiService, private layoutService: LayoutService) {
    this.checkRequests();
  }

  checkRequests() {
    this.nextRequest$
      .pipe(
        tap(next => this.layoutService.showRequestInfo$.next(!!next)),
        tap(next => (next ? this.setTimer() : null))
      )
      .subscribe();
  }

  setTimer() {
    const timeout = 20 * 60;
    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.timer = timer(0, 1000).subscribe(time => {
      const estimateTime = timeout - time;
      estimateTime > 0
        ? this.layoutService.requestTimer$.next(timeout - time)
        : (this.timer.unsubscribe(), this.clearNextRequest());
    });
  }

  identificationRequest(id: string, data: IdentificatonRequest) {
    this.timer.unsubscribe();
    this.searchRequests();
    // return this.apiService.put(`api/requests/identification/${id}/`, data);
  }

  verificationRequest(id: string, data: VerificationRequest) {
    this.timer.unsubscribe();
    this.searchRequests();
    // return this.apiService.put(`api/requests/verification/${id}/`, data);
  }

  private popRequest(): Observable<Application | false> {
    return Observable.create((observer: Observer<Application | false>) => {
      setTimeout(() => {
        observer.next(this.generateFakeRequest());
        observer.complete();
      }, 200);
    });
    // return this.apiService.get('api/requests/pop/');
  }

  searchRequests() {
    this.nextRequest$.next(undefined);
    this.popRequest().subscribe(res => this.nextRequest$.next(res));
  }

  generateFakeRequest(): Application | false {
    const request = identificationRequest;
    return request;
  }

  clearNextRequest() {
    this.nextRequest$.next(false);
  }
}
