import { HistoryVerificationService } from './../core/services/history-verification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor(public historyVerificationService: HistoryVerificationService) { }
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

  Terror = 'neutral';
  InnerTest = 'neutral';

  ngOnInit() {
  }

  toggleTerror($event) {
    this.Terror = $event;
  }
  toggleInnerTest($event) {
    this.InnerTest = $event;
  }


  allGreen () {
    return this.Terror === 'on' &&
    this.InnerTest === 'on';
  }

  greenOrRed() {
    return !this.allGreen() &&
    this.Terror !== 'neutral' &&
    this.InnerTest !== 'neutral';
  }

  get firstButton() {
    if (this.allGreen()) {
      return false;
    } else {
      return true;
    }
  }
  successClick() {
    this.historyVerificationService.addHistoryItem('pass');
    console.log(this.historyVerificationService.getHistoryItems());
  }
  unsuccessClick() {
    this.historyVerificationService.addHistoryItem('fail');
    console.log(this.historyVerificationService.getHistoryItems());
  }
  get secondButton() {
    if (this.greenOrRed()) {
      return false;
    } else {
      return true;
    }
  }

}
