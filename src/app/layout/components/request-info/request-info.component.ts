import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-request-info',
  templateUrl: 'request-info.component.html',
  styleUrls: ['request-info.component.scss']
})
export class RequestInfoComponent implements OnInit, OnDestroy {
  @Language()
  lang: string;

  private subscription: Subscription;
  public time$: Observable<number>;
  public fields$: Observable<string>;

  @HostBinding('class.show')
  visible = false;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.subscription = this.layoutService.showRequestInfo$.subscribe(this.setVisible.bind(this));
    this.time$ = this.layoutService.requestTimer$.asObservable();
    this.fields$ = this.layoutService.requestFields$.asObservable();
  }

  setVisible(res: boolean) {
    this.visible = !!res;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
