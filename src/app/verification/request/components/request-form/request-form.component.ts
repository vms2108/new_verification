import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs';
import { every } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { RequestConfirmComponent } from '../../../dialogs/components/request-confirm/request-confirm.component';
import { RequestService } from '../../services/request.service';

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
    this.onFormChanges(form);
    this.subscribeToFormChanges(form);

    console.log( this.requestForm, this.formSections );

  }

  constructor(private dialog: MatDialog, private requestService: RequestService) {}

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
    const fields = this.requestService.getFormFields(form.value);

    const fieldsNum = fields.length;
    const approvedNum = fields.filter(field => field.state === true).length;

    this.approved = fieldsNum === approvedNum;

    if (this.approved) {
      this.requestService.setRequestFieldsInfo(approvedNum, fieldsNum);
      return (this.valid = true);
    }

    const fieldsWithStateNum = fields.filter(field => typeof field.state === 'boolean').length;
    const allFieldsWithState = fieldsWithStateNum === fieldsNum;

    const notApprovedNum = fields.filter(field => field.state === false).length;
    const notApprovedWithMessageNum = fields.filter(
      field => field.state === false && (field.noMessage || field.message)
    ).length;

    const allNotApprovedHasMessage = notApprovedNum === notApprovedWithMessageNum;

    this.valid = allFieldsWithState && allNotApprovedHasMessage;

    this.requestService.setRequestFieldsInfo(approvedNum + notApprovedWithMessageNum, fieldsNum);
  }

  confirm(state: boolean) {
    const { type } = this.requestForm.value;
    const dataSection = this.requestForm.value[type === 'verification' ? 'Personal data' : 'Basic data'];
    const {
      name: { value: name },
      surname: { value: surname }
    } = dataSection;

    const user = `${name} ${surname}`;
    const text = `${state ? '' : 'not '}to ${type}`;
    const dialogRef = this.dialog.open(RequestConfirmComponent, {
      width: '500px',
      data: { text, user }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.sendForm(state);
      }
    });
  }

  sendForm(result: boolean) {
    this.requestService.sendForm(this.requestForm.value, result);
  }
}
