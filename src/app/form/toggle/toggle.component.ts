import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  constructor() { }
  @Output() onChanged = new EventEmitter<string>();
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
