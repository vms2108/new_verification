import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../../verification.models';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-request-header',
  templateUrl: 'request-header.component.html',
  styleUrls: ['request-header.component.scss']
})
export class RequestHeaderComponent implements OnInit {
  public type: string;
  public user: string;
  public id: string;
  public date: string;

  @Language()
  lang: string;

  @Input()
  set application(application: Application) {
    this.type = application.type;
    this.id = application.id;
    this.date = application.date_of_creation;
    const { first_name : { value: firstName } } = application.user_data;
    const { last_name : { value: lastName } } = application.user_data;
    let middleName;

    if ( application.user_data.middle_name && application.user_data.middle_name.value ) {
      middleName = application.user_data.middle_name.value;
    }

    this.user = `${firstName} ${middleName || ''} ${lastName}`;
  }

  ngOnInit() {}
}
