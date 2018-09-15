import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  @Input()
  menuOpen = false;

  @Output()
  toggleMenu = new EventEmitter<boolean>();

  toggle() {
    this.toggleMenu.next(!this.menuOpen);
  }

  logout() {}
}
