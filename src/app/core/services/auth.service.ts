import { Injectable } from '@angular/core';
import { AuthInfo } from '../models/authInfo.model';
import { UserInfo } from '../models/userInfo.model';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  private authInfo: AuthInfo;
  private userInfo: UserInfo;

  private AUTH_INFO_FIELD = 'bonum_auth_info';
  private USER_INFO_FIELD = 'bonum_user_info';

  public verificationInProgess = false;
  public verificationSended = new Subject<any>();

  public authStatusChanged = new Subject<any>();

  constructor() {
    this.initializeAuth();
  }

  setStorageField(field: any, value: any) {
    localStorage.setItem(field, JSON.stringify(value));
  }

  unsetStorageField(field: string) {
    localStorage.setItem(field, null);
  }

  getStorageField(field: string) {
    const item = localStorage.getItem(field);
    if ( item ) {
      return JSON.parse( item );
    }
    return undefined;
  }

  initializeAuth() {
    this.authInfo = this.getStorageField(this.AUTH_INFO_FIELD);
    this.userInfo = this.getStorageField(this.USER_INFO_FIELD);
    this.checkAuthState();
  }

  setAuthInfo(data: AuthInfo) {
    this.authInfo = data;
    this.setStorageField(this.AUTH_INFO_FIELD, this.authInfo);
    this.checkAuthState();
  }

  getAuthInfo() {
    return this.authInfo;
  }

  setToken(access: string) {
    this.authInfo.access = access;
    this.setStorageField(this.AUTH_INFO_FIELD, this.authInfo);
    this.checkAuthState();
  }

  getToken(): string | undefined {
    if ( this.authInfo ) {
      return this.authInfo.access;
    }
    return undefined;
  }

  setUserInfo(data: any) {
    this.userInfo = data;
    this.setStorageField(this.USER_INFO_FIELD, this.userInfo);
    this.checkAuthState();
  }

  getUserInfo(): UserInfo | undefined {
    return this.userInfo;
  }

  logout() {
    this.userInfo = undefined;
    this.unsetStorageField(this.USER_INFO_FIELD);
    this.authInfo = undefined;
    this.unsetStorageField(this.AUTH_INFO_FIELD);
    this.checkAuthState();
  }

  isLoggedIn(): boolean {
    return !!this.authInfo && !!this.userInfo;
  }

  checkAuthState() {
    this.authStatusChanged.next( this.isLoggedIn() );
  }

}
