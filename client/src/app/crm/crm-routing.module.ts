import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmLayoutComponent } from './components/crm-layout/crm-layout.component';
import { AuthGuard } from '../auth/classes/auth.quard';
import { OverviewPageComponent } from '../overview/components/overview-page/overview-page.component';
import { AnalyticsPageComponent } from '../analytics/components/analytics-page/analytics-page.component';
import { CategoriesPageComponent } from '../categories/components/categories-page/categories-page.component';
import { HistoryPageComponent } from '../history/components/history-page/history-page.component';
import { OrderPageComponent } from '../order/components/order-page/order-page.component';
import { CategoriesFormComponent } from '../categories/components/categories-page/categories-form/categories-form.component';
import { OrderCategoriesComponent } from '../order/components/order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from '../order/components/order-page/order-positions/order-positions.component';

const crmRoutes: Routes = [
  {
    path: '',
    component: CrmLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'categories/new', component: CategoriesFormComponent },
      { path: 'categories/:id', component: CategoriesFormComponent },
      { path: 'history', component: HistoryPageComponent },
      {
        path: 'order',
        component: OrderPageComponent,
        children: [
          { path: '', component: OrderCategoriesComponent },
          { path: ':id', component: OrderPositionsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmRoutes)],
  exports: [RouterModule],
})
export class CrmRoutingModule {}
