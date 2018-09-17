import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-request-layout',
  templateUrl: 'request-layout.component.html',
  styleUrls: ['request-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestLayoutComponent {
  @Input()
  loading = true;
}
