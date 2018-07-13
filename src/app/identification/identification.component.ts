import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {
  name = 'Ivan';
  labelName = 'Имя';
  surname = 'Ivanov';
  labelSurname = 'Фамилия';
  birthday = '27.03.1986';
  labelBirthday = 'Дата рождения';
  birthplace = 'Saratov';
  labelBirthplace = 'Место рождения';
  index = '234567';
  labelIndex = 'Почтовый индекс';
  country = 'Russia';
  labelCountry = 'Страна';
  city = 'Rostov';
  labelCity = 'Город';
  address = 'Lenina, 54-7';
  labelAdress = 'Адреc';
  typeMain = 'passport';
  labelTypeMain = 'Тип документа';
  numberMain = '73 05 777888';
  labelNumberMain = 'Номер документа';
  validityMain = '23.09.2028';
  labelValidityMain = 'Срок действия';
  typeAddition = 'drivers license';
  labelTypeAddition = 'Тип документа';
  numberAddition = ' 984567';
  labelNumberAddition = 'Номер документа';
  validityAddition = '02.02.2022';
  labelValidityAddition = 'Срок действия';

  Base = 'neutral';
  Location = 'neutral';
  Main = 'neutral';
  Addition = 'neutral';
  Binding = 'neutral';
  ngOnInit() {
  }

  toggleBase($event) {
    this.Base = $event;
  }
  toggleLocation($event) {
    this.Location = $event;
  }
  toggleMain($event) {
    this.Main = $event;
  }
  toggleAddition($event) {
    this.Addition = $event;
  }
  toggleBinding($event) {
    this.Binding = $event;
  }

  allGreen () {
    return this.Base === 'on' &&
    this.Location === 'on' &&
    this.Main === 'on' &&
    this.Addition === 'on' &&
    this.Binding === 'on';
  }

  greenOrRed() {
    return !this.allGreen() &&
    this.Base !== 'neutral' &&
    this.Location !== 'neutral' &&
    this.Main !== 'neutral' &&
    this.Addition !== 'neutral' &&
    this.Binding !== 'neutral';
  }

  get firstButton() {
    if (this.allGreen()) {
      return false;
    } else {
      return true;
    }
  }
  successClick() {
    console.log('Success');
  }
  unsuccessClick() {
    console.log('unSuccess');
  }
  get secondButton() {
    if (this.greenOrRed()) {
      return false;
    } else {
      return true;
    }
  }
}
