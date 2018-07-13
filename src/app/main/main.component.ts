import { AuthInfo } from './../core/models/authInfo.model';
import { UserInfo } from './../core/models/userInfo.model';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../core/models';
import { UserService } from '../core/services';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private userInfo: UserInfo;
    private authInfo: AuthInfo;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
      this.userInfo = this.authService.getUserInfo();
      this.authInfo = this.authService.getAuthInfo();
      console.log(this.userInfo);
  }
}
