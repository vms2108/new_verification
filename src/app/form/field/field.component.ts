import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() label: string;
  @Input() field: FormGroup;
  @Input() toggleNone = true;

  get isPhoto(): boolean {
    return this.field.get('photo').value;
  }

  ngOnInit() {}

  toggleState() {
    const currentState = this.field.get('state').value;
    let newState = null;
    if (currentState === null) {
      newState = true;
    }
    if (currentState === true) {
      newState = false;
    }
    if (currentState === false) {
      newState = null;
    }
    this.field.get('state').setValue(newState);
  }
}
