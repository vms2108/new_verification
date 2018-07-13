import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor() { }
  @Input() Value: string;
  @Input() Label: string;
  ngOnInit() {
  }

}
