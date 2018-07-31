import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleComponent),
  multi: true
};

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [CONTROL_ACCESSOR]
})
export class ToggleComponent implements ControlValueAccessor, OnInit {
  state = null;

  @Input() readonly = false;

  onChange: Function = () => {};
  onTouched: Function = () => {};
  ngOnInit() {}
  writeValue(state) {
    this.state = state;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  changeState(state) {
    if (this.readonly) {
      return;
    }
    if (state === null && this.state === null) {
      state = true;
    }
    if (state === true && this.state === true) {
      state = false;
    }
    if (state === false && this.state === false) {
      state = null;
    }
    this.state = state;
    this.onChange(this.state);
  }
}
