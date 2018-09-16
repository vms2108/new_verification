import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-request-big-image',
  templateUrl: 'request-big-image.component.html',
  styleUrls: ['request-big-image.component.scss']
})
export class RequestBigImageComponent {
  @Input()
  image: string;
}
