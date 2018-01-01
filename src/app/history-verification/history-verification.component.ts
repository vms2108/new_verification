import { VerificationTableItem } from '../core/models/verificationTableItem.model';
import { VerificationService } from '../core/services/verification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from 'angular-l10n';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-history-verification',
  templateUrl: './history-verification.component.html',
  styleUrls: ['./history-verification.component.scss']
})
export class HistoryVerificationComponent implements OnInit {
  private verifications: VerificationTableItem[];
  filterGroup: FormGroup = new FormGroup({
    search: new FormControl({ disabled: true }, Validators.required),
    datesFrom: new FormControl({ disabled: true }, Validators.required),
    datesTo: new FormControl({ disabled: true }, Validators.required),
    result: new FormControl({ disabled: true }, Validators.required)
  });
  pickerMin;
  pickerMax;
  data: any;
  results = ['pass', 'fail', 'waiting'];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'user_id', 'deal_id', 'date', 'result', 'verifier', 'details'];
  @Language() lang: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private verificationService: VerificationService, private fb: FormBuilder) {
    this.verifications = this.verificationService.generateHistoryTable();
    this.dataSource = new MatTableDataSource(this.verifications);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const { minDate, maxDate } = this.getDates(this.verifications);
    this.pickerMin = minDate;
    this.pickerMax = maxDate;
    this.dataSource.data = this.verifications;
    this.data = this.verifications;
    this.filterGroup = this.fb.group({
      search: [null],
      datesFrom: minDate,
      datesTo: maxDate,
      reason: [null],
      result: [null]
    });
    this.filterGroup.valueChanges.subscribe(() => {
      this.filterData();
    });
    window.scrollTo(0, 0);
  }
  filterData() {
    this.dataSource.data = this.data.filter(item => {
      const filter = this.filterGroup.value;
      let dateStart = filter.datesFrom;
      let dateEnd = filter.datesTo;
      if (!(dateStart instanceof Date)) {
        dateStart = new Date(dateStart);
      }
      if (!(dateEnd instanceof Date)) {
        dateEnd = new Date(dateEnd);
      }
      if (+dateStart > +dateEnd) {
        filter.datesFrom = dateEnd;
        filter.datesTo = dateStart;
        dateStart = this.filterGroup.value.datesFrom;
        dateEnd = this.filterGroup.value.datesTo;
      }
      dateStart.setHours(0);
      dateStart.setMinutes(0);
      dateStart.setSeconds(0);
      dateStart.setMilliseconds(0);
      dateEnd.setHours(23);
      dateEnd.setMinutes(59);
      dateEnd.setSeconds(59);
      dateEnd.setMilliseconds(99);
      const date = +item.date <= +dateEnd && +item.date >= +dateStart;
      const search = filter.search
        ? item.searchString
            .trim()
            .toLowerCase()
            .indexOf(filter.search.trim().toLowerCase()) > -1
        : true;
      const result = filter.result && filter.result.length ? filter.result.indexOf(item.result) > -1 : true;
      this.filterGroup.get('datesFrom').setValue(dateStart, { emitEvent: false });
      this.filterGroup.get('datesTo').setValue(dateEnd, { emitEvent: false });
      return date && search && result;
    });
  }
  getDates(data: VerificationTableItem[]) {
    const dates = data.map(i => i.date).sort((a, b) => a.getTime() - b.getTime());
    return {
      minDate: dates[0],
      maxDate: dates[dates.length - 1]
    };
  }

  more(row: any) {
    console.log(row);
  }
}
