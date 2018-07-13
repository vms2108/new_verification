import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChanged = new EventEmitter<string>();
  constructor() { }
  @Input() Value: string;
  @Input() Label: string;
  @Input() Id: string;
  on: string = null;
  off: string = null;
  neutral: string = null;
  value: string = null;
  ngOnInit() {
    this.on = 'on' + this.Id;
    this.off = 'off' + this.Id;
    this.neutral = 'neutral' + this.Id;
    this.value = 'value' + this.Id;
  }
  change (value: string) {
    this.onChanged.emit(value);
  }

}
