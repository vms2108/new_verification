import { Injectable } from '@angular/core';
import {
  Application,
  FieldsGroup,
  ApplicationtUserData,
  IdentificatonRequest,
  VerificationRequest
} from '../../verification.models';
import { FormBuilder, FormGroup } from '@angular/forms';

import { identificationFields, identificationPhotoFields } from './identification-fields';
import { verificationReadonlyFields, verificationFields } from './verification-fields';
import { VerificationService } from '../../shared/services/verification.service';
import { LayoutService } from '../../../layout/services/layout.service';

@Injectable()
export class RequestService {
  constructor(
    private fb: FormBuilder,
    private verificationService: VerificationService,
    private layoutService: LayoutService
  ) {}

  addField(fieldGroup: FormGroup, fieldName: string, userData: ApplicationtUserData, type: string) {
    fieldGroup.addControl(
      fieldName,
      this.fb.group({
        title: fieldName,
        value: userData[fieldName],
        state: null,
        message: null,
        isPhoto: this.isPhotoField(fieldName),
        stateless: type === 'verification' ? this.isFieldStateless(fieldName) : false,
        noMessage: type === 'verification' ? this.isFieldDontNeedMeesage(fieldName) : false
      })
    );
  }

  isFieldDontNeedMeesage(fieldName: string): boolean {
    return verificationReadonlyFields.indexOf(fieldName) < 0;
  }

  isFieldStateless(fieldName: string): boolean {
    return verificationReadonlyFields.indexOf(fieldName) > -1;
  }

  isPhotoField(fieldName: string): boolean {
    return identificationPhotoFields.indexOf(fieldName) > -1;
  }

  addFieldsGroup(form: FormGroup, group: FieldsGroup, userData: ApplicationtUserData, type: string) {
    const fieldGroup = this.fb.group({ title: group.group });
    group.fields.forEach(field => this.addField(fieldGroup, field, userData, type));
    form.addControl(group.group, fieldGroup);
  }

  generateForm(application: Application): FormGroup {
    const fields = application.type === 'identification' ? identificationFields : verificationFields;
    const form = this.fb.group({});
    fields.forEach(fieldsGroup => {
      this.addFieldsGroup(form, fieldsGroup, application.user_data, application.type);
    });
    form.addControl('splitImage', this.fb.control(application.user_data.main_document.path));
    form.addControl('type', this.fb.control(application.type));
    form.addControl('id', this.fb.control(application.id));
    return form;
  }

  getFormFields(formValue: any) {
    return Object.keys(formValue)
      .filter(field => ['splitImage', 'id', 'type'].indexOf(field) < 0)
      .reduce((fieldsArr: any[], group: string) => {
        Object.keys(formValue[group])
          .filter(field => ['title'].indexOf(field) < 0)
          .forEach(field => {
            fieldsArr.push(formValue[group][field]);
          });
        return fieldsArr;
      }, [])
      .filter(field => !field.stateless);
  }

  sendForm(formData: any, result: boolean) {
    const { type, id } = formData;
    if (type === 'verification') {
      this.verificationService.verificationRequest(id, this.generateVerificationRequest(formData, result));
    }
    if (type === 'identification') {
      this.verificationService.identificationRequest(id, this.generateIdentificationRequest(formData, result));
    }
  }

  generateVerificationRequest(formData: any, result: boolean): VerificationRequest {
    const { id } = formData;
    let {
      'User verification': {
        'Check platform criterias': { state: is_blacklisted },
        'Check terrorist': { state: is_terrorist }
      }
    } = formData;
    is_blacklisted = !is_blacklisted;
    is_terrorist = !is_terrorist;
    return { id, result, is_blacklisted, is_terrorist };
  }

  generateIdentificationRequest(formData: any, result: boolean): IdentificatonRequest {
    const { id } = formData;
    const fields = this.getFormFields(formData);
    const user_data: {
      [key: string]: {
        state: boolean;
        message?: string;
      };
    } = fields.reduce((userdata: any, field: any) => {
      const { title, state, message } = field;
      userdata[title] = { state, message: message || undefined };
      return userdata;
    }, {});

    return { id, result, user_data };
  }

  setRequestFieldsInfo(checked: number, all: number) {
    this.layoutService.requestFields$.next(`${checked}/${all}`);
  }
}
