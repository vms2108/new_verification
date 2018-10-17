import { Injectable } from '@angular/core';
import {
  Application,
  ApplicationtUserData,
  IdentificatonRequest,
  VerificationRequest,
  RequestField,
  ApplicationDocument,
  RequestFieldsGroup,
  Request
} from '../../verification.models';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VerificationService } from '../../shared/services/verification.service';
import { LayoutService } from '../../../layout/services/layout.service';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RequestService {

  private dateFields = ['birth_date', 'issue_date', 'expiration_date'];
  private photoFields = ['path', 'selfie_path'];

  public splittedPhoto$ = new BehaviorSubject<string>(undefined);

  constructor(
    private fb: FormBuilder,
    private verificationService: VerificationService,
    private layoutService: LayoutService
  ) {}

  private isPhotoField(field: string) {
    return this.photoFields.indexOf(field) > -1;
  }

  private prepareDate(date: string): string {
    return moment(date).format('MM.DD.YYYY');
  }

  private addPhoneField(personalFields: any[], form: FormGroup, phone) {
    personalFields.push({
      name: 'phone',
      state: true,
      value: `${phone.country_code} ${phone.number}`
    });
    form.addControl('phone', this.fb.group({
      id: phone.id,
      status: null,
      comment: null
    }));
  }

  private addStatefulField(name: string, value: any, form: FormGroup, fields: RequestField[]) {
    form.addControl(name, this.fb.group({
      status: null,
      comment: null
    }));
    const control = form.get(name) as FormGroup;
    fields.push({
      name, value, state: true, control
    });
  }

  private prepareFieldValue(field, value) {
    if ( this.dateFields.indexOf(field) > -1) {
      return this.prepareDate(value);
    }
    return value;
  }

  private createPersonalFields(userData: ApplicationtUserData, form: FormGroup, fields: RequestFieldsGroup[]) {
    const personalFields: RequestField[] = [];
    const keys = [
      'first_name',
      'middle_name',
      'last_name',
      'birth_date',
      'birth_place',
      'phone'
    ];
    keys.forEach((key) => {
      const field = userData[key];
      if ( key === 'phone' && userData.phone && userData.phone.length &&  userData.phone[0].number ) {
        return this.addPhoneField( personalFields, form, userData.phone[0] );
      }
      if ( field && field.value ) {
        return this.addStatefulField(key, this.prepareFieldValue(key, field.value), form, personalFields);
      }
    });
    fields.push({
      name: 'Basic data',
      state: false,
      fields: personalFields
    });
  }

  private createAddressFields(userData: ApplicationtUserData, form: FormGroup, fields: RequestFieldsGroup[]) {
    const addressFields = [];
    const address = userData.address;

    form.addControl('address', this.fb.group({}));
    const addressForm = form.get('address') as FormGroup;

    const keys = [
      'index',
      'state',
      'country',
      'city',
      'street',
      'building',
      'apartment'
    ];
    keys.forEach((key) => {
      const field = address[key];
      if ( field && field.value ) {
        return this.addStatefulField(key, this.prepareFieldValue(key, field.value), addressForm, addressFields);
      }
    });
    fields.push({
      name: 'Location',
      state: false,
      fields: addressFields
    });
  }

  private createDocumentFields(userData: ApplicationtUserData, name: string, form: FormGroup, fields: RequestFieldsGroup[]) {
    const documentFields: RequestField[] = [];
    const document = userData[name] as ApplicationDocument;

    form.addControl(name, this.fb.group({
      id: document.id,
      status: null,
      comment: null
    }));

    const keys = [
      'number', 'type', 'issue_date', 'expiration_date', 'endless', 'path', 'selfie_path'
    ];

    keys.forEach(key => {
      let value = document[key];
      if ( key === 'type' && value === 'OTHER' ) {
        value = document.type_custom;
      }
      if ( value ) {
        documentFields.push({
          name: key,
          value,
          state: false,
          photo: this.isPhotoField(key)
        });
      }
    });

    fields.push({
      name,
      state: true,
      fields: documentFields,
      control: form.get(name) as FormGroup,
    });

  }

  private generateIdentificationForm(application: Application): Request {
    const fields: RequestFieldsGroup[] = [];

    const form = this.fb.group({
      id: application.id,
      result: undefined,
      user_data: this.fb.group({})
    });

    const userData = application.user_data;
    const formData = form.get('user_data') as FormGroup;

    this.createPersonalFields( userData, formData, fields );
    this.createAddressFields( userData, formData, fields );

    this.createDocumentFields( userData, 'main_document', formData, fields );
    this.createDocumentFields( userData, 'extra_document', formData, fields );

    const mainDocPhoto = application
      && application.user_data
      && application.user_data.main_document
      && application.user_data.main_document.path;

    if ( mainDocPhoto ) {
      this.splittedPhoto$.next(mainDocPhoto);
    }

    return { form, fields };
  }

  generateForm(application: Application): Request {
    if (application.type === 'identification') {
      return this.generateIdentificationForm(application);
    }
  }


  // addField(fieldGroup: FormGroup, field: RequestField, userData: ApplicationtUserData, type: string, ) {

  //   const formField = field.parent ? userData[field.parent][field.name] : userData[field.name];

  //   let formValue = null;

  //   if ( formField ) {
  //     formValue = field.stateless ? formField || null : formField && formField.value || null;
  //   }

  //   fieldGroup.addControl(
  //     field.name,
  //     this.fb.group({
  //       title: field.name,
  //       value: formValue,
  //       state: null,
  //       message: null,
  //       isPhoto: this.isPhotoField(field.name),
  //       stateless: type === 'verification' ? this.isFieldStateless(field.name) : !!field.stateless,
  //       noMessage: type === 'verification' ? this.isFieldDontNeedMeesage(field.name) : false
  //     })
  //   );
  // }

  // isFieldDontNeedMeesage(fieldName: string): boolean {
  //   return verificationReadonlyFields.indexOf(fieldName) < 0;
  // }

  // isFieldStateless(fieldName: string): boolean {
  //   return verificationReadonlyFields.indexOf(fieldName) > -1;
  // }

  // isPhotoField(fieldName: string): boolean {
  //   return identificationPhotoFields.indexOf(fieldName) > -1;
  // }

  // addFieldsGroup(form: FormGroup, group: FieldsGroup, userData: ApplicationtUserData, type: string) {
  //   const fieldGroup = this.fb.group({ title: group.group });
  //   group.fields.forEach(field => this.addField(fieldGroup, field, userData, type));
  //   form.addControl(group.group, fieldGroup);
  // }

  // generateForm(application: Application): FormGroup {
  //   const fields = application.type === 'identification' ? identificationFields : verificationFields;
  //   const form = this.fb.group({});
  //   fields.forEach(fieldsGroup => {
  //     this.addFieldsGroup(form, fieldsGroup, application.user_data, application.type);
  //   });
  //   form.addControl('splitImage', this.fb.control(application.user_data.main_document.path));
  //   form.addControl('type', this.fb.control(application.type));
  //   form.addControl('id', this.fb.control(application.id));
  //   return form;
  // }

  // getFormFields(formValue: any) {
  //   return Object.keys(formValue)
  //     .filter(field => ['splitImage', 'id', 'type'].indexOf(field) < 0)
  //     .reduce((fieldsArr: any[], group: string) => {
  //       Object.keys(formValue[group])
  //         .filter(field => ['title'].indexOf(field) < 0)
  //         .forEach(field => {
  //           fieldsArr.push(formValue[group][field]);
  //         });
  //       return fieldsArr;
  //     }, [])
  //     .filter(field => !field.stateless);
  // }

  // sendForm(formData: any, result: boolean) {
  //   const { type, id } = formData;
  //   if (type === 'verification') {
  //     this.verificationService.verificationRequest(id, this.generateVerificationRequest(formData, result));
  //   }
  //   if (type === 'identification') {
  //     this.verificationService.identificationRequest(id, this.generateIdentificationRequest(formData, result));
  //   }
  // }

  // generateVerificationRequest(formData: any, result: boolean): VerificationRequest {
  //   const { id } = formData;
  //   let {
  //     'User verification': {
  //       'Check platform criterias': { state: is_blacklisted },
  //       'Check terrorist': { state: is_terrorist }
  //     }
  //   } = formData;
  //   is_blacklisted = !is_blacklisted;
  //   is_terrorist = !is_terrorist;
  //   return { id, result, is_blacklisted, is_terrorist };
  // }

  // generateIdentificationRequest(formData: any, result: boolean): IdentificatonRequest {
  //   const { id } = formData;
  //   const fields = this.getFormFields(formData);
  //   const user_data: {
  //     [key: string]: {
  //       state: boolean;
  //       message?: string;
  //     };
  //   } = fields.reduce((userdata: any, field: any) => {
  //     const { title, state, message } = field;
  //     userdata[title] = { state, message: message || undefined };
  //     return userdata;
  //   }, {});

  //   return { id, result, user_data };
  // }

  // setRequestFieldsInfo(checked: number, all: number) {
  //   this.layoutService.requestFields$.next(`${checked}/${all}`);
  // }
}
