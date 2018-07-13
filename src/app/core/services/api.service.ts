import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ApiService {

  private API_URL = 'http://35.192.110.131';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  getAuthHeader() {
    const token = this.authService.getToken();
    if ( token ) {
      return new HttpHeaders().set('Authorization', `Bearer ${ token }`);
    }
    return new HttpHeaders();
  }


  makeRequest(method: string, uri: string, data?: any): Observable<any> {

    const requests = {
      'GET': this.http.get(`${this.API_URL}/${uri}`, { headers: this.getAuthHeader() }),
      'POST': this.http.post(`${this.API_URL}/${uri}`, data, { headers: this.getAuthHeader() })
    };

    return Observable.create((observer: Observer<any>) => {
      requests[method]
        .subscribe((res: any) => {
          observer.next( res );
          observer.complete();
        }, (err) => {
          if ( err.error && err.error.code === 'token_not_valid' ) {
            return this.refreshToken( observer, method, uri, data );
          }
          observer.error( err );
          observer.complete();
        });
    });

  }

  refreshToken(observer: Observer<any>, method, uri, data) {
    const { refresh } = this.authService.getAuthInfo();
    this.post('api/token/refresh/', { refresh }).subscribe((res: any) => {
      this.authService.setToken( res.access );
      this.makeRequest(method, uri, data).subscribe((response: any) => {
        observer.next( response );
        observer.complete();
      }, (error: any) => {
        observer.error( error );
        observer.complete();
      });
    });
  }

  get(url: string): Observable<any> {
    return this.makeRequest('GET', url);
  }

  post(url: string, data: any): Observable<any> {
    return this.makeRequest('POST', url, data);
  }

}
