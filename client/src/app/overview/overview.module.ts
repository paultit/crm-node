import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';

@NgModule({
  declarations: [
    OverviewPageComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [OverviewPageComponent]
})
export class OverviewModule { }
