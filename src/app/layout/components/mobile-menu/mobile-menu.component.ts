import { Component, Input, HostBinding, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: 'mobile-menu.component.html',
  styleUrls: ['mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Input()
  open = false;

  @HostBinding('class.open')
  get isMenuOpen() {
    return this.open;
  }

  @Output()
  close = new EventEmitter();

  @Language()
  lang: string;

  public email = '';
  public isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(this.setAuthInfo.bind(this));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.close.emit();
  }

  setAuthInfo(status: boolean) {
    this.isAuthenticated = status;
    if (this.isAuthenticated) {
      this.email = this.authService.getUserInfo().email;
    }
  }
}
