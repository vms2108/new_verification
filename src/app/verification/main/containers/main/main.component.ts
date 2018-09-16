import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public loading = false;

  @Language()
  lang: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  searchRequests() {
    this.loading = true;
    this.router.navigate(['/request']);
    // setTimeout(() => {
    //   this.loading = false;
    //   this.router.navigate(['/']);
    // }, 2000);
  }
}
