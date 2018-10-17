import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { FormGroup } from '@angular/forms';
import { RequestField } from 'src/app/verification/verification.models';

@Component({
  selector: 'app-request-form-text',
  templateUrl: 'request-form-text.component.html',
  styleUrls: ['request-form-text.component.scss']
})
export class RequestFormTextComponent implements OnInit {
  @Input()
  field: RequestField;

  @Language()
  lang: string;

  get title(): string {
    return this.field.name;
  }

  get value(): string {
    return this.field.value;
  }

  get stateless(): boolean {
    return !this.field.state;
  }

  get noMessage() {
    return false;
  }

  get state() {
    return this.field.control.get('status').value;
  }

  ngOnInit() {}

  toggleState(e: Event) {
    if (e) {
      e.preventDefault();
    }
    if (this.stateless) {
      return;
    }
    const currentState = this.field.control.get('status').value;
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
    this.field.control.get('status').setValue(newState);
  }
}
