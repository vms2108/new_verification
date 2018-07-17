import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { chunk } from 'lodash';
import { User } from '../core/models';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { IndetificationConfirmComponent } from '../dialogs/indetification-confirm/indetification-confirm.component';
import { History } from '../core/models/history.model';
import { IdentificationService } from '../core/services/identification.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {
  public user: User;
  public sections: any[] = [];
  public approved = false;
  public fromFrom = [];

  public indetificationForm: FormGroup = this.fb.group({
    title: 'Идентификация пользователя'
  });

  constructor(private usersService: UsersService,
    private fb: FormBuilder, private dialog: MatDialog,
    private identificationService: IdentificationService) {}

  ngOnInit() {
    this.user = this.usersService.getUser();
    this.generateForm(this.user);
    this.subscribeToFormChanges();
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

  generateField(title: string, value: any, photo = false) {
    return this.fb.group({
      title,
      value,
      photo,
      state: [undefined],
      message: null
    });
  }

  generateForm(user: User) {
    // Базовые
    const {
      info: { name, surname, date_of_birth}
    } = user;
    this.indetificationForm.addControl(
      'base',
      this.fb.group({
        title: 'Базовые данные',
        state: null,
        fields: this.fb.group({
          name: this.generateField('Имя', name),
          surname: this.generateField('Фамилия', surname),
          date_of_birth: this.generateField('Дата рождения', moment(date_of_birth).format('DD.MM.YYYY'))
        })
      })
    );

    // Место жительства
    const {
      info: { country, city, adress}
    } = user;
    this.indetificationForm.addControl(
      'address',
      this.fb.group({
        title: 'Место жительства',
        state: null,
        fields: this.fb.group({
          country: this.generateField('Страна', country),
          city: this.generateField('Город (населенный пункт)', city),
          street: this.generateField('Адресс', adress)
        })
      })
    );

    // Основной документ
    const {
      info: { main_doc_number, main_doc_photo, main_doc_selfie, main_doc_validdate }
    } = user;
    this.indetificationForm.addControl(
      'main_doc',
      this.fb.group({
        title: 'Основной документ',
        state: null,
        fields: this.fb.group({
          main_doc_number: this.generateField('Номер документа', main_doc_number),
          main_doc_validdate: this.generateField('Срок действия', moment(main_doc_validdate).format('DD.MM.YYYY')),
          main_doc_photo: this.generateField('Фото документа', main_doc_photo, true),
          main_doc_selfie: this.generateField('Селфи с документом', main_doc_selfie, true)
        })
      })
    );

    // Дополнительный документ
    const {
      info: {
        secondary_doc_number,
        secondary_doc_photo,
        secondary_doc_validdate
      }
    } = user;
    this.indetificationForm.addControl(
      'secondary_doc',
      this.fb.group({
        title: 'Дополнительный документ',
        state: null,
        fields: this.fb.group({
          secondary_doc_number: this.generateField('Номер документа', secondary_doc_number),
          secondary_doc_validdate: this.generateField(
            'Срок действия',
            moment(secondary_doc_validdate).format('DD.MM.YYYY')
          ),
          secondary_doc_photo: this.generateField('Фото документа', secondary_doc_photo, true)
        })
      })
    );

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
    const dialogRef = this.dialog.open(IndetificationConfirmComponent, {
      width: '500px',
      data: { approved, user: `${this.user.info.name} ${this.user.info.surname}` }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.user.id);
      const data = this.getResult();
      this.identificationService.saveIdentifications(data, this.user.id);
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
        arr.forEach((item) => {
          fields[item.name] = { value: item.value, state: item.state, message: item.message};
        });
      });
    return fields;
  }
}
