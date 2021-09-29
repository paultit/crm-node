import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { HistoryListComponent } from './components/history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './components/history-page/history-filter/history-filter.component';



@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [HistoryPageComponent]
})
export class HistoryModule { }
