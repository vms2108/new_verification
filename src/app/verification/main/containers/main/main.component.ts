import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public loading = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  searchRequests() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/']);
    }, 2000);
  }
}
