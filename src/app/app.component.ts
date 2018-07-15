import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isAuthenticated = false;
  public email = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.setAuthInfo(this.authService.isLoggedIn());
    this.authService.authStatusChanged.subscribe((status: boolean) => {
      this.setAuthInfo(status);
    });
  }

  setAuthInfo(status: boolean) {
    this.isAuthenticated = status;
    if (this.isAuthenticated) {
      this.email = this.authService.getUserInfo().email;
    }
  }

  logout() {
    this.authService.logout();
    this.email = '';
    this.router.navigate(['/login']);
  }
}
