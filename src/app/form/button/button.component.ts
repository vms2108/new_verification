
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }
  @Input() active = false;
  @Input() name: string;
  @Output() myClick = new EventEmitter();
  ngOnInit() {
  }
  onClick() {
    this.myClick.emit();
  }

  get visible() {
    return !this.active;
  }
}
