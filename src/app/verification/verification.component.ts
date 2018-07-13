import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor() { }
  name = 'Ivan';
  labelName = 'Имя';
  surname = 'Ivanov';
  labelSurname = 'Фамилия';
  birthday = '27.03.1986';
  labelBirthday = 'Дата рождения';
  country = 'Russia';
  labelCountry = 'Страна';
  typeMain = 'passport';
  labelTypeMain = 'Тип документа';
  numberMain = '73 05 777888';
  labelNumberMain = 'Номер документа';
  validityMain = '23.09.2028';
  labelValidityMain = 'Срок действия';

  ngOnInit() {
  }

}
