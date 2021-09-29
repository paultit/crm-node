import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderPageComponent } from '../order/components/order-page/order-page.component';
import { OrderCategoriesComponent } from '../order/components/order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from '../order/components/order-page/order-positions/order-positions.component';

const orderRoutes: Routes = [
  { path: 'order', component: OrderPageComponent, children: [
    { path: '', component: OrderCategoriesComponent },
    { path: ':id', component: OrderPositionsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes,
    )],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
