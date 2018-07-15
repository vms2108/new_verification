import { Component, forwardRef } from '@angular/core';
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
export class ToggleComponent implements ControlValueAccessor {
  state = null;

  onChange: Function = () => {};
  onTouched: Function = () => {};

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
