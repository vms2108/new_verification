import { Injectable } from '@angular/core';
import { ApiService } from '../../../api/services/api.service';
import { identificationRequest } from '../../request/containers/request/identification-request';
import { LayoutService } from '../../../layout/services/layout.service';
import * as moment from 'moment';

import { BehaviorSubject, Observable, timer, Subject, throwError, of } from 'rxjs';
import { tap, filter, map, switchMap, takeUntil, catchError } from 'rxjs/operators';

import { IdentificatonRequest, VerificationRequest, Application } from '../../verification.models';

@Injectable()
export class VerificationService {

  private clearTimer$ = new Subject<any>();

  private nextRequestSubject$ = new BehaviorSubject<Application | null>(null);
  public nextRequest$: Observable<Application | null> = this.nextRequestSubject$.asObservable();

  constructor(private apiService: ApiService, private layoutService: LayoutService) {
    this.initTimer();
    this.checkRequests();
  }


  initTimer() {
    this.nextRequest$.pipe(
      filter(r => !!r),
      map(request => {
        const expirationDate = moment(request.expiration_date);
        const estimateSeconds = expirationDate.diff(moment(), 'seconds');
        return estimateSeconds;
      }),
      switchMap(seconds => {
        return timer(0, 1000).pipe(
          map(t => seconds - t),
          takeUntil(this.clearTimer$)
        );
      })
    )
    .subscribe((estimateTime) => {
      this.layoutService.requestTimer$.next( estimateTime );
      if ( estimateTime <= 0 ) {
        this.clearNextRequest();
      }
    });
  }

  checkRequests() {
    this.nextRequest$
      .subscribe( next => this.layoutService.showRequestInfo$.next(!!next) );
  }

  sendRequest(url: string, data: IdentificatonRequest | VerificationRequest) {
    return this.apiService.put(url, data).pipe(
      catchError(err => {
        return throwError({ error : true });
      }),
      switchMap(() => this.popRequest().pipe(
        tap(res => this.nextRequestSubject$.next(res))
      ))
    );
  }

  identificationRequest(id: string, data: IdentificatonRequest) {
    return this.sendRequest(`api/requests/identification/${id}/`, data);
  }

  verificationRequest(id: string, data: VerificationRequest) {
    return this.sendRequest(`api/requests/verification/${id}/`, data);
  }

  private popRequest(): Observable<Application | null> {
    return this.apiService.get('api/requests/pop/').pipe(
      catchError(err => of({ error: true, err:  err.error }))
    );
  }

  searchRequests() {
    this.nextRequestSubject$.next(undefined);
    this.popRequest().subscribe(res => this.nextRequestSubject$.next(res));
  }

  generateFakeRequest(): Application | null {
    const request = identificationRequest;
    return request;
  }

  clearNextRequest() {
    this.clearTimer$.next();
    this.nextRequestSubject$.next(null);
  }
}
