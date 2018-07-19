import { Identification } from './../core/models/identification.model';
import { VerificationService } from '../core/services/verification.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { chunk, random } from 'lodash';
import { User } from '../core/models';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { IndetificationConfirmComponent } from '../dialogs/indetification-confirm/indetification-confirm.component';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  public user: User;
  public sections: any[] = [];
  public approved = false;
  public text = '';

  public verificationForm: FormGroup = this.fb.group({
    title: 'Верификация пользователя'
  });

  constructor(private usersService: UsersService, private fb: FormBuilder, private dialog: MatDialog,
    private verificationService: VerificationService) {}

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
      info: { name, surname, date_of_birth, country, main_doc_number, main_doc_photo,   main_doc_validdate}
    } = user;
    this.verificationForm.addControl(
      'base',
      this.fb.group({
        title: null,
        onlyRead: true,
        state: true,
        fields: this.fb.group({
          name: this.generateField('Имя', name),
          surname: this.generateField('Фамилия', surname),
          date_of_birth: this.generateField('Дата рождения', moment(date_of_birth).format('DD.MM.YYYY')),
          country: this.generateField('Страна', country),
          main_doc_number: this.generateField('Номер документа', main_doc_number),
          main_doc_validdate: this.generateField('Срок действия', moment(main_doc_validdate).format('DD.MM.YYYY')),
          main_doc_photo: this.generateField('Фото документа', main_doc_photo, true)
        })
      })
    );

    this.verificationForm.addControl(
      'list_of_terror',
      this.fb.group({
        title: 'Проверка по списку террористов',
        state: null,
        onlyRead: false,
        fields: this.fb.group({
        })
      })
    );

    this.verificationForm.addControl(
      'inner_list',
      this.fb.group({
        title: 'Проверка по внутренним спискам',
        state: null,
        onlyRead: false,
        fields: this.fb.group({
        })
      })
    );

    this.sections = this.getFormSections(this.verificationForm).map(section => {
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
    this.verificationForm.valueChanges.subscribe(() => {
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
    if (approved) {this.text = 'Вы приняли решение верифицировать пользователя';
  } else {this.text = 'Вы приняли решение не верифицировать пользователя'; }
    const dialogRef = this.dialog.open(IndetificationConfirmComponent, {
      width: '500px',
      data: { text: `${this.text}`, user: `${this.user.info.name} ${this.user.info.surname}`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const user_info = this.getUserData();
        const test = this.getResult();
        const deal_id =  random(1, 10);
        let totals = 'waiting';
        if (this.approved === true) {
          totals = 'pass';
        }
        if (this.approved === false) {
          totals = 'fail';
        }
        this.verificationService.saveIdentifications(user_info, test, this.user.id, totals, deal_id);
      }
    });
  }
  getUserData() {
    const arr = [];
    const fields = {};
      Object.keys(this.verificationForm.value).forEach((name: string) => {
        if (name === 'base') {
          Object.keys(this.verificationForm.value[name].fields).forEach((name2: string) => {
              const field = this.verificationForm.value[name].fields[name2];
              field.name = name2;
              arr.push(field);
          });
        }
        arr.forEach((item) => {
          fields[item.name] =  item.value;
        });
      });
    return fields;
  }

  getResult() {
    const arr = [];
    const fields = {};
    Object.keys(this.verificationForm.value).forEach((name: string, item) => {
       if (name === 'inner_list' || name === 'list_of_terror') {
        fields[name] = this.verificationForm.value[name].state;
      }
    });
    return fields;
  }
}
