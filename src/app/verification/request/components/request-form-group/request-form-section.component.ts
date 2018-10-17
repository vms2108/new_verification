import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'angular-l10n';
import { RequestFieldsGroup } from 'src/app/verification/verification.models';

@Component({
  selector: 'app-request-form-section',
  templateUrl: 'request-form-section.component.html',
  styleUrls: ['request-form-section.component.scss']
})
export class RequestFormSectionComponent implements OnInit {
  public title: string;
  public fields: FormGroup[] = [];
  public hasPhotoFields = false;

  @Input() section: RequestFieldsGroup;

  @Language()
  lang: string;

  ngOnInit() {}
}
