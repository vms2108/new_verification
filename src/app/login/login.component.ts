import { AuthService } from './../core/services/auth.service';
import { ApiService } from './../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../core/services';

@Component({
    templateUrl: 'login.component.html',
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
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

        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }



  submitLogin() {
    this.sending = true;
    const email = this.loginForm.get('email').value.toLowerCase();
    const password = this.loginForm.get('password').value;
    this.apiService
      .post('api/token/', { email, password })
      .subscribe(
        this.successLogin.bind(this),
        this.loginError.bind(this)
    );
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
