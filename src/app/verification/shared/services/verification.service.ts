import { Injectable } from '@angular/core';
import { ApiService } from '../../../api/services/api.service';
import { IdentificatonRequest, VerificationRequest, Application } from '../../verification.models';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { random } from 'lodash';
import { identificationRequest } from '../../request/containers/request/identification-request';

@Injectable()
export class VerificationService {
  public nextRequest$ = new BehaviorSubject<Application | false>(this.generateFakeRequest());

  constructor(private apiService: ApiService) {}

  identificationRequest(id: string, data: IdentificatonRequest) {
    this.searchRequests();
    // return this.apiService.put(`api/requests/identification/${id}/`, data);
  }

  verificationRequest(id: string, data: VerificationRequest) {
    this.searchRequests();
    // return this.apiService.put(`api/requests/verification/${id}/`, data);
  }

  private popRequest(): Observable<Application | false> {
    return Observable.create((observer: Observer<Application | false>) => {
      setTimeout(() => {
        observer.next(this.generateFakeRequest());
        observer.complete();
      }, 1000);
    });
    // return this.apiService.get('api/requests/pop/');
  }

  searchRequests() {
    this.nextRequest$.next(undefined);
    this.popRequest().subscribe(res => this.nextRequest$.next(res));
  }

  generateFakeRequest(): Application | false {
    const request = identificationRequest;
    const requestType = random(0, 2);
    if (requestType === 0) {
      return false;
    }
    if (requestType === 1) {
      request.type = 'identification';
      return request;
    }
    if (requestType === 2) {
      request.type = 'verification';
      return request;
    }
  }

  clearNextRequest() {
    this.nextRequest$.next(false);
  }
}
