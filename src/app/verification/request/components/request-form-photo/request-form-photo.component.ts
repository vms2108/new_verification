import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'angular-l10n';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutService } from '../../../../layout/services/layout.service';
import { RequestField } from 'src/app/verification/verification.models';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-form-photo',
  templateUrl: 'request-form-photo.component.html',
  styleUrls: ['request-form-photo.component.scss']
})
export class RequestFormPhotoComponent implements OnInit {

  @Input()
  field: RequestField;

  @Language()
  lang: string;

  get title(): string {
    return this.field.name;
  }

  get value(): string {
    return this.field.value;
  }

  get stateless(): boolean {
    return !this.field.state;
  }

  get noMessage() {
    return false;
  }

  get state() {
    return this.field.control.get('status').value;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private layoutService: LayoutService,
    private requestService: RequestService
  ) {}

  ngOnInit() {}

  toggleState(e: Event) {
    if (e) {
      e.stopPropagation();
    }
    if (this.stateless) {
      return;
    }
    const currentState = this.field.control.get('status').value;
    let newState = null;
    if (currentState === null) {
      newState = true;
    }
    if (currentState === true) {
      newState = false;
    }
    if (currentState === false) {
      newState = null;
    }
    this.field.control.get('status').setValue(newState);
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  defaultAction() {
    if (window.innerWidth < 768) {
      return this.onZoom();
    }
    this.onSplit();
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  onZoom(e?: Event) {
    if (e) {
      e.stopPropagation();
    }
    this.layoutService.setZoomImage(this.field.value);
  }

  onSplit(e?: Event) {
    this.requestService.splittedPhoto$.next( this.field.value );
  }
}
