import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { RequestFieldsGroup } from 'src/app/verification/verification.models';

@Component({
  selector: 'app-request-form-section',
  templateUrl: 'request-form-section.component.html',
  styleUrls: ['request-form-section.component.scss']
})
export class RequestFormSectionComponent implements OnInit {

  @Input() section: RequestFieldsGroup;

  @Language()
  lang: string;

  ngOnInit() {}

  toggleState(e: Event) {
    if (e) {
      e.preventDefault();
    }
    if (!this.section.state) {
      return;
    }
    const currentState = this.section.control.get('status').value;
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
    this.section.control.get('status').setValue(newState);
  }
}
