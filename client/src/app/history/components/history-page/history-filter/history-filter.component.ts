import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  MaterialDatepicker,
  MaterialService,
} from 'src/app/core/services/material/material.service';
import { Filter } from 'src/app/shared/interfaces/filter/filter';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css'],
})
export class HistoryFilterComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  @Output() onFilter = new EventEmitter<Filter>();
  order: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;
  isValid = true;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(
      this.startRef,
      this.validate.bind(this)
    );
    this.end = MaterialService.initDatepicker(
      this.endRef,
      this.validate.bind(this)
    );
  }

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    this.isValid = this.start.date < this.end.date;
  }
  submitFilter() {
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }
    this.onFilter.emit(filter);
  }
}
