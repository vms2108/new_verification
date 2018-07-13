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
  currentStatus = undefined;
  ngOnInit() {
  }
  change (value: string) {
    this.onChanged.emit(value);
  }
  onClick(value) {
    this.currentStatus = value;
  }
}
