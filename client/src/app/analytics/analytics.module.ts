import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';



@NgModule({
  declarations: [
    AnalyticsPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnalyticsPageComponent
  ]
})
export class AnalyticsModule { }
