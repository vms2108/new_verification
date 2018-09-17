import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'angular-l10n';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutService } from '../../../../layout/services/layout.service';

@Component({
  selector: 'app-request-form-photo',
  templateUrl: 'request-form-photo.component.html',
  styleUrls: ['request-form-photo.component.scss']
})
export class RequestFormPhotoComponent implements OnInit {
  @Input()
  field: FormGroup;

  @Language()
  lang: string;

  get title(): string {
    return this.field.get('title').value;
  }

  get value(): string {
    return this.field.get('value').value;
  }

  get stateless(): boolean {
    return this.field.get('stateless').value;
  }

  get noMessage() {
    return this.field.get('noMessage').value;
  }

  get state() {
    return this.field.get('state').value;
  }

  constructor(private sanitizer: DomSanitizer, private layoutService: LayoutService) {}

  ngOnInit() {}

  toggleState(e: Event) {
    if (e) {
      e.stopPropagation();
    }
    if (this.stateless) {
      return;
    }
    const currentState = this.field.get('state').value;
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
    this.field.get('state').setValue(newState);
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
    this.layoutService.setZoomImage(this.field.get('value').value);
  }

  onSplit(e?: Event) {
    if (e) {
      e.stopPropagation();
    }
    const form = this.field.parent.parent;
    form.get('splitImage').setValue(this.field.get('value').value);
  }
}
