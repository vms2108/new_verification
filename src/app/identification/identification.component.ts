import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersService } from '../core/services';
import { FormBuilder, FormGroup, AbstractControl } from '../../../node_modules/@angular/forms';
import { chunk } from 'lodash';
import { User } from '../core/models';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {
  public user: User;
  public sections: any[] = [];

  public indetificationForm: FormGroup = this.fb.group({
    title: 'Идентификация пользователя'
  });

  constructor(private usersService: UsersService, private fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.usersService.getUser();
    this.generateForm(this.user);
    this.subscribeToFormChanges();
  }

  getFormSections() {
    if (!this.indetificationForm) {
      return [];
    }
    const controls = this.indetificationForm.controls;
    const sections = [];
    Object.keys(controls).forEach((name: string) => {
      if (name !== 'title') {
        sections.push(controls[name]);
      }
    });
    return sections;
  }

  getFields(section: AbstractControl) {
    const sectionFields = section.get('fields') as FormGroup;
    const fields = [];
    Object.keys(sectionFields.controls).forEach((name: string) => {
      if (name !== 'title') {
        fields.push(sectionFields.controls[name]);
      }
    });
    const grouped = chunk(fields, 2);
    return grouped;
  }

  generateField(title: string, value: string) {
    return this.fb.group({
      title,
      value,
      state: [undefined],
      message: null
    });
  }

  generateForm(user: User) {
    // Базовые
    const {
      info: { name, surname, date_of_birth, birth_country }
    } = user;
    this.indetificationForm.addControl(
      'base',
      this.fb.group({
        title: 'Базовые данные',
        state: null,
        fields: this.fb.group({
          name: this.generateField('Имя', name),
          surname: this.generateField('Фамилия', surname),
          date_of_birth: this.generateField('Дата рождения', date_of_birth),
          birth_country: this.generateField('Место рождения', birth_country)
        })
      })
    );

    // Место жительства
    const {
      info: { post_index, country, district, city, street, home, flat }
    } = user;
    this.indetificationForm.addControl(
      'address',
      this.fb.group({
        title: 'Место жительства',
        state: null,
        fields: this.fb.group({
          post_index: this.generateField('Почтовый индекс', post_index),
          country: this.generateField('Страна', country),
          district: this.generateField('Район (штат, административная единица)', district),
          city: this.generateField('Город (населенный пункт)', city),
          street: this.generateField('Улица', street),
          home: this.generateField('Дом', home),
          flat: this.generateField('Квартира', flat)
        })
      })
    );

    // Основной документ
    const {
      info: { main_doc_number, main_doc_photo, main_doc_selfie, main_doc_type, main_doc_validdate }
    } = user;
    this.indetificationForm.addControl(
      'main_doc',
      this.fb.group({
        title: 'Основной документ',
        state: null,
        fields: this.fb.group({
          main_doc_type: this.generateField('Вид документа', main_doc_type),
          main_doc_number: this.generateField('Номер документа', main_doc_number),
          main_doc_validdate: this.generateField('Срок действия', main_doc_validdate),
          main_doc_photo: this.generateField('Фото документа', main_doc_photo),
          main_doc_selfie: this.generateField('Селфи с документом', main_doc_selfie)
        })
      })
    );

    // Дополнительный документ
    const {
      info: {
        secondary_doc_number,
        secondary_doc_photo,
        secondary_doc_selfie,
        secondary_doc_type,
        secondary_doc_validdate
      }
    } = user;
    this.indetificationForm.addControl(
      'secondary_doc',
      this.fb.group({
        title: 'Дополнительный документ',
        state: null,
        fields: this.fb.group({
          secondary_doc_type: this.generateField('Вид документа', secondary_doc_type),
          secondary_doc_number: this.generateField('Номер документа', secondary_doc_number),
          secondary_doc_validdate: this.generateField('Срок действия', secondary_doc_validdate),
          secondary_doc_photo: this.generateField('Фото документа', secondary_doc_photo),
          secondary_doc_selfie: this.generateField('Селфи с документом', secondary_doc_selfie)
        })
      })
    );

    this.sections = this.getFormSections().map(section => {
      section.fields = this.getFields(section);
      return section;
    });
  }

  subscribeToFormChanges() {
    // this.indetificationForm.valueChanges.subscribe(() => {
    //   console.log(this.indetificationForm.value);
    // });
  }
}
