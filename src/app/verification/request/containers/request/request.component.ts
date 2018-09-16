import { Component, OnInit } from '@angular/core';
import { identificationRequest } from './identification-request';
import { FormGroup } from '@angular/forms';
import { Application } from '../../../verification.models';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: 'request.component.html',
  styleUrls: ['request.component.scss']
})
export class RequestComponent implements OnInit {
  public identificationForm: FormGroup;
  public application: Application;

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.application = identificationRequest;
    this.identificationForm = this.requestService.generateForm(identificationRequest);
  }
}
