import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: 'mobile-menu.component.html',
  styleUrls: ['mobile-menu.component.scss']
})
export class MobileMenuComponent {
  @Input()
  open = false;

  @HostBinding('class.open')
  get isMenuOpen() {
    return this.open;
  }
}
