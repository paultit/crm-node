import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MaterialInstance,
  MaterialService,
} from 'src/app/core/services/material/material.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { Order } from 'src/app/order/interfaces/order';
import { Filter } from 'src/app/shared/interfaces/filter/filter';
const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isFilterVisible = false;
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  offset = 0;
  limit = STEP;
  oSub: Subscription;
  orders: Order[] = [];
  loading = false;
  reloading = false;
  noMoreOrders = false;
  filter: Filter = {};
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit,
    });

    this.oSub = this.ordersService.fetch(params).subscribe((orders) => {
      this.orders = this.orders.concat(orders);
      this.loading = false;
      this.reloading = false;
      this.noMoreOrders = orders.length < STEP;
    });
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
