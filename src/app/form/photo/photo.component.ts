import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  imageUrlStyle: SafeStyle;
  imageUrl: SafeResourceUrl;
  visible = false;

  @Input()
  set src(url: string) {
    this.imageUrlStyle = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
      this.visible = false;
    }
  }

  constructor(private sanitizer: DomSanitizer) {}

  open() {
    this.visible = !this.visible;
  }

  close() {
    this.visible = false;
  }
}
