import { Injectable } from '@angular/core';
import { Application, FieldsGroup, ApplicationtUserData } from '../../verification.models';
import { FormBuilder, FormGroup } from '@angular/forms';

import { identificationFields, identificationPhotoFields } from './identification-fields';
import { verificationReadonlyFields, verificationFields } from './verification-fields';

@Injectable()
export class RequestService {
  constructor(private fb: FormBuilder) {}

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
    form.addControl('splitImage', this.fb.control(application.user_data.main_doc_photo));
    form.addControl('type', this.fb.control(application.type));
    form.addControl('id', this.fb.control(application.id));
    return form;
  }
}
