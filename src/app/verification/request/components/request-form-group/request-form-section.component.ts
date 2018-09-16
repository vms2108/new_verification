import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-request-form-section',
  templateUrl: 'request-form-section.component.html',
  styleUrls: ['request-form-section.component.scss']
})
export class RequestFormSectionComponent implements OnInit {
  public title: string;
  public fields: FormGroup[] = [];
  public hasPhotoFields = false;

  @Input()
  set section(section: FormGroup) {
    this.title = section.get('title').value;
    this.fields = this.getFields(section);
  }

  @Language()
  lang: string;

  ngOnInit() {}

  getFields(section: FormGroup) {
    const fields = [];
    Object.keys(section.controls).forEach((name: string) => {
      if (name !== 'title') {
        fields.push(section.controls[name]);
        if (section.controls[name].get('isPhoto').value) {
          this.hasPhotoFields = true;
        }
      }
    });
    return fields;
  }
}
