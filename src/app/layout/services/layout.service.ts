import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutService {
  public showRequestInfo$ = new BehaviorSubject<boolean>(false);
  public requestTimer$ = new BehaviorSubject<number>(0);
  public requestFields$ = new BehaviorSubject<string>(`0/0`);
  public zoomImage$ = new BehaviorSubject<string>(undefined);

  constructor() {
    console.log('init layout service');
  }

  setZoomImage(image: string) {
    this.zoomImage$.next(image);
  }

  unsetZoomImage() {
    this.zoomImage$.next(undefined);
  }
}
