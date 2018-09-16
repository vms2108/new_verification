import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutService {
  public zoomImage$ = new BehaviorSubject<string>(undefined);

  setZoomImage(image: string) {
    this.zoomImage$.next(image);
  }

  unsetZoomImage() {
    this.zoomImage$.next(undefined);
  }
}
