import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmLayoutComponent } from './components/crm-layout/crm-layout.component';
import { CrmRoutingModule } from './crm-routing.module';
import { OverviewModule } from '../overview/overview.module';
import { SharedModule } from '../shared/shared.module';
import { OrderModule } from '../order/order.module';
import { CategoriesModule } from '../categories/categories.module';
import { HistoryModule } from '../history/history.module';

@NgModule({
  declarations: [CrmLayoutComponent],
  imports: [
    CommonModule,
    CrmRoutingModule,
    OverviewModule,
    OrderModule,
    CategoriesModule,
    HistoryModule,
    SharedModule,
  ],
  exports: [CrmRoutingModule],
})
export class CrmModule {}
