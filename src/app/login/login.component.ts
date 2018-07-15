import { AuthService } from '../core/services/auth.service';
import { ApiService } from '../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  public sending = false;
  public formError = false;
  public userNotFound = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submitLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.sending = true;
    this.userNotFound = false;
    const email = this.loginForm.get('email').value.toLowerCase();
    const password = this.loginForm.get('password').value;
    this.apiService
      .post('api/token/', { email, password })
      .subscribe(this.successLogin.bind(this), this.loginError.bind(this));
  }

  successLogin(res: any) {
    this.sending = false;
    if (res) {
      this.authService.setAuthInfo(res);
      this.getUser();
    }
  }

  loginError(err: any) {
    this.sending = false;
    if (err.error && err.error.non_field_errors) {
      return (this.userNotFound = true);
    }
    this.formError = true;
    setTimeout(() => {
      this.formError = false;
    }, 60000);
  }

  getUser() {
    this.sending = true;
    this.apiService.get('api/user/').subscribe((res: any) => {
      this.sending = false;
      if (res) {
        this.authService.setUserInfo(res);
        this.router.navigate([this.returnUrl]);
      }
    });
  }
}
