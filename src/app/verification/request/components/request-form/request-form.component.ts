import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RequestConfirmComponent } from '../../../dialogs/components/request-confirm/request-confirm.component';
import { RequestService } from '../../services/request.service';
import { RequestFieldsGroup, Application } from 'src/app/verification/verification.models';
import { RequestErrorComponent } from 'src/app/verification/dialogs/components/request-error/request-error.component';

@Component({
  selector: 'app-request-form',
  templateUrl: 'request-form.component.html',
  styleUrls: ['request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  private subscription: Subscription;

  public approved = false;
  public valid = false;

  private requestForm: FormGroup;

  @Output() loading = new EventEmitter<boolean>();

  @Language()
  lang: string;

  @Input() application: Application;
  @Input() fields: RequestFieldsGroup[];

  get type() {
    return this.application.type;
  }

  @Input()
  set form(form: FormGroup) {
    this.requestForm = form;
    this.onFormChanges(form);
    this.subscribeToFormChanges(form);
  }


  constructor(private dialog: MatDialog, private requestService: RequestService) {}

  ngOnInit() {}

  subscribeToFormChanges(form: FormGroup) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = form.valueChanges.subscribe(() => {
      this.onFormChanges(form);
    });
  }

  onFormChanges(form: FormGroup) {

    const fields = this.requestService.getFormFields( form.value, this.application.type );

    const fieldsNum = fields.length;
    const approvedNum = fields.filter(field => field.status === true).length;

    this.approved = fieldsNum === approvedNum;

    if (this.approved) {
      this.requestService.setRequestFieldsInfo(approvedNum, fieldsNum);
      return (this.valid = true);
    }

    const fieldsWithStateNum = fields.filter(field => typeof field.status === 'boolean').length;
    const allFieldsWithState = fieldsWithStateNum === fieldsNum;

    const notApprovedNum = fields.filter(field => field.status === false).length;
    const notApprovedWithMessageNum = fields.filter(
      field => field.status === false && ( field.comment === undefined || field.comment  )
    ).length;

    const allNotApprovedHasMessage = notApprovedNum === notApprovedWithMessageNum;

    this.valid = allFieldsWithState && allNotApprovedHasMessage;

    this.requestService.setRequestFieldsInfo(approvedNum + notApprovedWithMessageNum, fieldsNum);
  }

  confirm(state: boolean) {
    const { type } = this.application;
    const { first_name: { value: name }, last_name: { value: surname } } = this.application.user_data;
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
    this.loading.emit(true);
    this.requestService.sendForm(this.application, this.requestForm.value, result).subscribe(
      () => this.loading.emit(false),
      () => {
        this.loading.emit(false);
        this.dialog.open(RequestErrorComponent);
      }
    );
  }
}
