import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MaterialInstance,
  MaterialService,
} from 'src/app/core/services/material/material.service';
import { Order } from 'src/app/order/interfaces/order';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
})
export class HistoryListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('orders') orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  selectedOrder: Order;
  constructor() {}

  ngOnInit(): void {
    console.log(this.orders);
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }

  selectOrder(order: Order) {
    console.log(order);
    this.selectedOrder = order;
    this.modal.open();
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  closeModal() {
    this.modal.close();
  }
}
