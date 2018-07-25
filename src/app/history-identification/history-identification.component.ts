import { IdentificationTableItem } from './../core/models/identificationTableItem.model';
import { IdentificationService } from '../core/services/identification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Language } from 'angular-l10n';
import { UsersService } from '../core/services';
import { User } from '../core/models';
import users from '../../assets/data/users.json';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-history-identification',
  templateUrl: './history-identification.component.html',
  styleUrls: ['./history-identification.component.scss']
})
export class HistoryIdentificationComponent implements OnInit {
  private identifications: IdentificationTableItem[];
  filterGroup: FormGroup = new FormGroup({
    'search': new FormControl({disabled: true}),
    'datesFrom': new FormControl({disabled: true}),
    'datesTo': new FormControl({disabled: true}),
    'result': new FormControl({disabled: true}),
    'reason': new FormControl({disabled: true}),
  });
  private users: User[];
  filters = {
    user : '',
    dateStart : null,
    dateEnd: null,
    result: null,
    reason: null
  };
  pickerMin;
  pickerMax;
  data: any;
  reasons = [{
    name: 'transaction',
    value: 2
  },
  {
    name: 'initiative',
    value: 3
  }
  ];
  results = [
    'pass',
    'fail',
    'waiting'
  ];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'user_id', 'reason', 'date', 'result', 'details'];
  @Language() lang: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private identificationService: IdentificationService,
  private usersService: UsersService,
  private fb: FormBuilder) {
    this.identifications = this.identificationService.generateHistoryTable();
    this.dataSource = new MatTableDataSource();
  }
  loadUsers() {
    this.users = users;
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const { minDate, maxDate } = this.getDates(this.identifications);
    this.pickerMin = minDate;
    this.pickerMax = maxDate;
    this.dataSource.data = this.identifications;
    this.data = this.identifications;
    this.filterGroup = this.fb.group({
      search: [null],
      datesFrom: minDate,
      datesTo: maxDate,
      reason: [null],
      result: [null]
     });
    this.filterGroup.valueChanges.subscribe(() => {this.filterData(); });
  }
  filterData() {
    this.dataSource.data = this.data.filter((item) => {
      const filter = this.filterGroup.value;
      let dateStart = filter.datesFrom;
      let dateEnd = filter.datesTo;
      if ( !(dateStart instanceof Date) ) {
        dateStart = new Date(dateStart);
      }
      if ( !(dateEnd instanceof Date) ) {
        dateEnd = new Date(dateEnd);
      }
      if ( +dateStart > +dateEnd ) {
        this.filterGroup.get('datesFrom').setValue(dateEnd, { emitEvent: false });
        this.filterGroup.get('datesTo').setValue(dateStart, { emitEvent: false });
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
      const search = filter.search ? item.searchString.trim().toLowerCase().indexOf(filter.search.trim().toLowerCase()) > -1 : true;
      const result = filter.result ? item.result.indexOf(filter.result) > -1 : true;
      const reason = filter.reason ? item.reason === filter.reason : true;
      return date && search && result && reason;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateFilters(e?: any) {

    if ( e && e.type === 'change' && e.target
      && e.target.type === 'checkbox'
      && (e.target.name === 'isChecked' || e.target.name === 'isNotChecked') ) {
      if (e.target.name === 'isChecked') {
      } else {
      }
    }

    let { user, dateStart, dateEnd } = this.filters;

    if ( !(dateStart instanceof Date) ) {
      dateStart = new Date(dateStart);
    }

    if ( !(dateEnd instanceof Date) ) {
      dateEnd = new Date(dateEnd);
    }

    if ( +dateStart > +dateEnd ) {
      this.filters.dateStart = dateEnd;
      this.filters.dateEnd = dateStart;
      dateStart = this.filters.dateStart;
      dateEnd = this.filters.dateEnd;
    }

    dateStart.setHours(0);
    dateStart.setMinutes(0);
    dateStart.setSeconds(0);
    dateStart.setMilliseconds(0);

    dateEnd.setHours(23);
    dateEnd.setMinutes(59);
    dateEnd.setSeconds(59);
    dateEnd.setMilliseconds(99);

    let filtered = this.data;
    const statuses = [];

    user = user.toLowerCase().trim();


      filtered = filtered.filter(i => i.user_surname.toLowerCase().indexOf(user) > -1 || i.user_name.toLowerCase().indexOf(user) > -1
    || i.id.indexOf(user) > -1);

    if ( status.length ) {
      filtered = filtered.filter((i) => {
        return status.indexOf(i.result) > -1;
      });
    }
    filtered = filtered.filter(i => {
      return +i.date <= +dateEnd && +i.date >= +dateStart;
    });

    this.dataSource.data = filtered;
  }

  getDates(data: IdentificationTableItem[]) {
  const dates =  data.map(i => i.date).sort((a, b) => a.getTime() - b.getTime());

    return {
      minDate: dates[0],
      maxDate: dates[dates.length - 1]
    };
  }
}
