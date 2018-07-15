import { AuthInfo } from '../core/models/authInfo.model';
import { UserInfo } from '../core/models/userInfo.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public userInfo: UserInfo;
  private authInfo: AuthInfo;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userInfo = this.authService.getUserInfo();
    this.authInfo = this.authService.getAuthInfo();
  }
}
