import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsService } from 'src/app/core/services/analytics/analytics.service';
import { MaterialInstance, MaterialService } from 'src/app/core/services/material/material.service';
import { OverviewPage } from 'src/app/shared/interfaces/overviewPage/overviewPage';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {

  data$: Observable<OverviewPage>;
  tapTarget: MaterialInstance;
  yesterday: Date = new Date;
  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  constructor(
    private analyticsService: AnalyticsService
  ) {
    this.data$ = this.analyticsService.getOverview();
   }

  ngOnInit(): void {
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy() {
    this.tapTarget.destroy();
  }

  openInfo() {
    this.tapTarget.open();
  }
}
