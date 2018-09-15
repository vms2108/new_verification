import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  menuOpen = false;

  @Output()
  toggleMenu = new EventEmitter<boolean>();

  public isAuthenticated = false;
  public email = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(this.setAuthInfo.bind(this));
  }

  toggle() {
    this.toggleMenu.next(!this.menuOpen);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  setAuthInfo(status: boolean) {
    this.isAuthenticated = status;
    if (this.isAuthenticated) {
      this.email = this.authService.getUserInfo().email;
    }
  }
}
