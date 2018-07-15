import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  state = undefined;

  changeState(state) {
    if (state === undefined && this.state === undefined) {
      state = true;
    }
    if (state === true && this.state === true) {
      state = false;
    }
    if (state === false && this.state === false) {
      state = undefined;
    }
    this.state = state;
  }
}
