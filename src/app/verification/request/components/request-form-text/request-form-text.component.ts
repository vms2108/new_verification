import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-form-text',
  templateUrl: 'request-form-text.component.html',
  styleUrls: ['request-form-text.component.scss']
})
export class RequestFormTextComponent implements OnInit {
  @Input()
  field: FormGroup;

  @Language()
  lang: string;

  get title(): string {
    return this.field.get('title').value;
  }

  get value(): string {
    return this.field.get('value').value;
  }

  get stateless(): boolean {
    return this.field.get('stateless').value;
  }

  get noMessage() {
    return this.field.get('noMessage').value;
  }

  get state() {
    return this.field.get('state').value;
  }

  ngOnInit() {}

  toggleState(e: Event) {
    if (e) {
      e.preventDefault();
    }
    if (this.stateless) {
      return;
    }
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
