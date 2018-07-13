import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  visible = false;
  constructor() { }
  @Input() Path: string;
  ngOnInit() {
  }
  open() {
    this.visible = !this.visible;
  }
  close() {
    this.visible = false;
  }
  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
        this.visible = false;
    }
  }
}
