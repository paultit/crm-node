import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Category } from 'src/app/categories/interfaces/category.interface';
import { Router, NavigationEnd } from '@angular/router';
import {
  MaterialInstance,
  MaterialService,
} from 'src/app/core/services/material/material.service';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isRoot: boolean;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  orderSub: Subscription;
  pending = false;
  constructor(
    private router: Router,
    public order: OrderService,
    private orders: OrdersService
    ) {}

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  submit() {
      const order: Order = {
      list: this.order.list.map(item => {
        delete item._id;
        return item;
      })
    }
    this.orderSub = this.orders.createOrder(order).subscribe((newOrder) => {
        MaterialService.toast(`Order №${newOrder.order} added`);
        this.order.clear();
      },
        (error) => {MaterialService.toast(error.error.message);
      },
      () => {
        this.modal.close();
        this.pending = false;
      }
    )
  }

  removePosition(orderPostion) {
    this.order.remove(orderPostion);
  }
}
