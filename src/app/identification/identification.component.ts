import { Component, OnInit, Inject, Input } from '@angular/core';
import { UsersService, AuthService } from '../core/services';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { chunk } from 'lodash';
import { User } from '../core/models';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { IndetificationConfirmComponent } from '../dialogs/indetification-confirm/indetification-confirm.component';
import { IdentificationService } from '../core/services/identification.service';
import { random } from 'lodash';
import { Language } from 'angular-l10n';
import { QueueItem } from '../core/models/queueItem.model';
import { Router } from '@angular/router';
import { UserInfo } from '../core/models/userInfo.model';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {
  public user: any;
  public sections: any[] = [];
  public approved = false;
  public fromFrom = [];
  public text = '';
  public queueItem: QueueItem;
  public indetificationForm: FormGroup = this.fb.group({
    title: 'Идентификация пользователя'
  });
  public userInfo: UserInfo;

  @Language() lang: string;

  @Input() id: number;
  public viewMode = false;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private identificationService: IdentificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.id) {
      this.viewMode = true;
      this.initViewMode(this.id);
    } else {
      this.initAsForm();
    }
  }

  initAsForm() {
    this.queueItem = this.usersService.nextVerification();
    this.initForm();
    this.userInfo = this.authService.getUserInfo();
    window.scrollTo(0, 0);
  }

  initViewMode(id: number) {
    const item = this.identificationService.getFormView(id);
    this.viewMode = true;
    this.generateView(item);
  }

  initForm() {
    const nextQueueItem = this.queueItem;
    if (!nextQueueItem) {
      this.router.navigate(['']);
    } else {
      if (nextQueueItem.type === 'verification') {
        this.router.navigate(['/verification/form']);
      } else {
        this.generateForm(this.queueItem);
        this.subscribeToFormChanges();
      }
    }
    window.scrollTo(0, 0);
  }

  getFormSections(form: FormGroup) {
    if (!form) {
      return [];
    }
    const controls = form.controls;
    const sections = [];
    Object.keys(controls).forEach((name: string) => {
      if (name !== 'title') {
        sections.push(controls[name]);
      }
    });
    return sections;
  }

  getFields(section: AbstractControl, noChunks = false) {
    const sectionFields = section.get('fields') as FormGroup;
    const fields = [];
    Object.keys(sectionFields.controls).forEach((name: string) => {
      if (name !== 'title') {
        fields.push(sectionFields.controls[name]);
      }
    });
    if (noChunks) {
      return fields;
    }
    const grouped = chunk(fields, 2);
    return grouped;
  }

  generateField(title: string, value: any, photo = false, state?: any) {
    return this.fb.group({
      title,
      value,
      photo,
      state: state ? state.state : undefined,
      message: state ? state.message : undefined
    });
  }

  generateBaseDataForm(fields: any, setState = false) {
    const { name, surname, date_of_birth } = fields;
    this.indetificationForm.addControl(
      'base',
      this.fb.group({
        title: 'Basic data',
        state: null,
        fields: this.fb.group({
          name: this.generateField('Name', setState ? name.value : name, false, setState ? surname : undefined),
          surname: this.generateField(
            'Surname',
            setState ? surname.value : surname,
            false,
            setState ? surname : undefined
          ),
          date_of_birth: this.generateField(
            'Date of birth',
            setState ? date_of_birth.value : moment(date_of_birth).format('DD.MM.YYYY'),
            false,
            setState ? date_of_birth : undefined
          )
        })
      })
    );
  }

  generateAdrressDataForm(fields: any, setState = false) {
    const { country, city, adress } = fields;
    this.indetificationForm.addControl(
      'address',
      this.fb.group({
        title: 'Location',
        state: null,
        fields: this.fb.group({
          country: this.generateField(
            'Country',
            setState ? country.value : country,
            false,
            setState ? country : undefined
          ),
          city: this.generateField('City (locality)', setState ? city.value : city, false, setState ? city : undefined),
          adress: this.generateField('Address', setState ? adress.value : adress, false, setState ? adress : undefined)
        })
      })
    );
  }

  generateMainDocDataForm(fields: any, setState = false) {
    const { main_doc_number, main_doc_validdate, main_doc_photo, main_doc_selfie } = fields;
    this.indetificationForm.addControl(
      'main_doc',
      this.fb.group({
        title: 'Basic document',
        state: null,
        fields: this.fb.group({
          main_doc_number: this.generateField(
            'Document Number',
            setState ? main_doc_number.value : main_doc_number,
            false,
            setState ? main_doc_number : undefined
          ),
          main_doc_validdate: this.generateField(
            'Validity',
            setState ? main_doc_validdate.value : moment(main_doc_validdate).format('DD.MM.YYYY'),
            false,
            setState ? main_doc_validdate : undefined
          ),
          main_doc_photo: this.generateField(
            'Photo document',
            setState ? main_doc_photo.value : main_doc_photo,
            true,
            setState ? main_doc_photo : undefined
          ),
          main_doc_selfie: this.generateField(
            'Selfi with the document',
            setState ? main_doc_selfie.value : main_doc_selfie,
            true,
            setState ? main_doc_selfie : undefined
          )
        })
      })
    );
  }

  generateSecondaryDocFormData(fields: any, setState = false) {
    const { secondary_doc_number, secondary_doc_validdate, secondary_doc_photo } = fields;
    this.indetificationForm.addControl(
      'secondary_doc',
      this.fb.group({
        title: 'Additional document',
        state: null,
        fields: this.fb.group({
          secondary_doc_number: this.generateField(
            'Document Number',
            setState ? secondary_doc_number.value : secondary_doc_number,
            false,
            setState ? secondary_doc_number : undefined
          ),
          secondary_doc_validdate: this.generateField(
            'Validity',
            setState ? secondary_doc_validdate.value : moment(secondary_doc_validdate).format('DD.MM.YYYY'),
            false,
            setState ? secondary_doc_validdate : undefined
          ),
          secondary_doc_photo: this.generateField(
            'Photo document',
            setState ? secondary_doc_photo.value : secondary_doc_photo,
            true,
            setState ? secondary_doc_photo : undefined
          )
        })
      })
    );
  }

  generateForm(queueItem: QueueItem) {
    // Базовые
    const {
      userInfo: { name, surname, date_of_birth }
    } = queueItem;
    this.generateBaseDataForm({ name, surname, date_of_birth });

    // Место жительства
    const {
      userInfo: { country, city, adress }
    } = queueItem;
    this.generateAdrressDataForm({ country, city, adress });

    // Основной документ
    const {
      userInfo: { main_doc_number, main_doc_photo, main_doc_selfie, main_doc_validdate }
    } = queueItem;
    this.generateMainDocDataForm({ main_doc_number, main_doc_photo, main_doc_selfie, main_doc_validdate });

    // Дополнительный документ
    const {
      userInfo: { secondary_doc_number, secondary_doc_photo, secondary_doc_validdate }
    } = queueItem;
    this.generateSecondaryDocFormData({ secondary_doc_number, secondary_doc_validdate, secondary_doc_photo });

    this.sections = this.getFormSections(this.indetificationForm).map(section => {
      section.fields = this.getFields(section);
      return section;
    });

    this.user = { name, surname };
  }

  generateView(identificationItem: any) {
    const fields = identificationItem.data;
    const {
      name,
      surname,
      date_of_birth,
      country,
      city,
      adress,
      main_doc_number,
      main_doc_photo,
      main_doc_selfie,
      main_doc_validdate,
      secondary_doc_number,
      secondary_doc_photo,
      secondary_doc_validdate
    } = fields;

    this.generateBaseDataForm({ name, surname, date_of_birth }, true);
    this.generateAdrressDataForm({ country, city, adress }, true);
    this.generateMainDocDataForm({ main_doc_number, main_doc_photo, main_doc_selfie, main_doc_validdate }, true);
    this.generateSecondaryDocFormData({ secondary_doc_number, secondary_doc_photo, secondary_doc_validdate }, true);

    this.user = { name: name.value, surname: surname.value };

    this.sections = this.getFormSections(this.indetificationForm).map(section => {
      section.fields = this.getFields(section);
      return section;
    });
  }

  sectionStateChanges() {
    this.sections.forEach((section: FormGroup) => {
      section.get('state').valueChanges.subscribe(state => {
        const fields = this.getFields(section, true);
        fields.forEach((field: any) => {
          field.get('state').setValue(state);
        });
      });
    });
  }

  fieldStateChanges() {
    this.sections.forEach((section: any) => {
      const fields = this.getFields(section, true);
      fields.forEach((field: FormGroup) => {
        field.get('state').valueChanges.subscribe(() => {
          const states = fields.map(f => f.get('state').value);
          if (states.length === states.filter(s => s === true).length) {
            section.get('state').setValue(true, { emitEvent: false });
          } else if (states.length === states.filter(s => s === false).length) {
            section.get('state').setValue(false, { emitEvent: false });
          } else {
            section.get('state').setValue(null, { emitEvent: false });
          }
        });
      });
    });
  }

  allFieldsChanges() {
    this.indetificationForm.valueChanges.subscribe(() => {
      let approved = true;
      this.sections.forEach(section => {
        if (section.get('state').value !== true) {
          approved = false;
        }
      });
      this.approved = approved;
    });
  }

  subscribeToFormChanges() {
    this.sectionStateChanges();
    this.fieldStateChanges();
    this.allFieldsChanges();
  }

  openDialog(approved: boolean) {
    if (approved) {
      this.text = 'You have decided to identify the user';
    } else {
      this.text = 'You decided not to identify the user';
    }
    const dialogRef = this.dialog.open(IndetificationConfirmComponent, {
      width: '500px',
      data: { text: `${this.text}`, user: `${this.queueItem.userInfo.name} ${this.queueItem.userInfo.surname}` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = this.getResult();
        const number = random(2, 3);
        let totals = 'waiting';
        if (this.approved === true) {
          totals = 'pass';
        }
        if (this.approved === false) {
          totals = 'fail';
        }
        const verifier = `${
          this.userInfo.firstName ? `${this.userInfo.firstName} ${this.userInfo.lastName}}` : this.userInfo.email
        }`;
        this.identificationService.saveIdentifications(data, this.queueItem.id, totals, number, verifier);
        this.usersService.updateUser(this.queueItem, approved);
        this.indetificationForm.reset();
        this.indetificationForm = this.fb.group({
          title: 'Идентификация пользователя'
        });
        this.queueItem = this.usersService.nextVerification();
        this.initForm();
      }
    });
  }

  getResult() {
    const arr = [];
    const fields = {};
    Object.keys(this.indetificationForm.value).forEach((name: string) => {
      if (name !== 'title') {
        Object.keys(this.indetificationForm.value[name].fields).forEach((name2: string) => {
          const field = this.indetificationForm.value[name].fields[name2];
          field.name = name2;
          arr.push(field);
        });
      }
      arr.forEach(item => {
        fields[item.name] = { value: item.value, state: item.state, message: item.message };
      });
    });
    return fields;
  }
}
