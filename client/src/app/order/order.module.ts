import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OrderCategoriesComponent } from './components/order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './components/order-page/order-positions/order-positions.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderService } from './services/order/order.service';

@NgModule({
  declarations: [
    OrderPageComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent
  ],
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  providers: [
    OrderService
  ],
  exports: [
    OrderPageComponent, OrderCategoriesComponent,
    OrderPositionsComponent
  ]
})
export class OrderModule { }
