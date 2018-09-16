import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs';
import { every } from 'lodash';

@Component({
  selector: 'app-request-form',
  templateUrl: 'request-form.component.html',
  styleUrls: ['request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  private subscription: Subscription;
  private requestForm: FormGroup;
  public formSections: FormGroup[] = [];

  public approved = false;
  public valid = false;

  get type() {
    return this.requestForm.get('type').value;
  }

  @Language()
  lang: string;

  @Input()
  set form(form: FormGroup) {
    this.requestForm = form;
    this.formSections = this.getFormSections(form);
    this.subscribeToFormChanges(form);
  }

  ngOnInit() {}

  getFormSections(form: FormGroup) {
    if (!form) {
      return [];
    }
    const controls = form.controls;
    const sections = [];
    Object.keys(controls)
      .filter(control => ['splitImage', 'type', 'id'].indexOf(control) < 0)
      .forEach((name: string) => {
        sections.push(controls[name]);
      });
    return sections;
  }

  subscribeToFormChanges(form: FormGroup) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = form.valueChanges.subscribe(() => {
      this.onFormChanges(form);
    });
  }

  onFormChanges(form: FormGroup) {
    const fields = Object.keys(form.value)
      .filter(field => ['splitImage', 'id', 'type'].indexOf(field) < 0)
      .reduce((fieldsArr: any[], group: string) => {
        Object.keys(form.value[group])
          .filter(field => ['title'].indexOf(field) < 0)
          .forEach(field => {
            fieldsArr.push(form.value[group][field]);
          });
        return fieldsArr;
      }, [])
      .filter(field => !field.stateless);

    const fieldsNum = fields.length;
    const approvedNum = fields.filter(field => field.state === true).length;

    this.approved = fieldsNum === approvedNum;

    if (this.approved) {
      return (this.valid = true);
    }

    const fieldsWithStateNum = fields.filter(field => typeof field.state === 'boolean').length;
    const allFieldsWithState = fieldsWithStateNum === fieldsNum;

    const allNotApprovedHasMessage = every(
      fields.filter(field => field.state === false),
      field => field.noMessage || field.message
    );

    this.valid = allFieldsWithState && allNotApprovedHasMessage;
  }

  openDialog(state: boolean) {}
}
