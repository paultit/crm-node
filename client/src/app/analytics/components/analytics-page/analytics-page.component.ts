import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/core/services/analytics/analytics.service';
import { AnalyticsPage } from 'src/app/shared/interfaces/analyticsPage/analyticsPage';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css'],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  aSub: Subscription;
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;

  average: number;
  pending = true;
  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)',
    };

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)',
    };

    this.aSub = this.analyticsService
      .getAnalytics()
      .subscribe((data: AnalyticsPage) => {
        this.average = data.average;

        gainConfig.labels = data.chart.map((item) => item.label);
        gainConfig.data = data.chart.map((item) => item.gain);

        orderConfig.labels = data.chart.map((item) => item.label);
        orderConfig.data = data.chart.map((item) => item.order);

        // **** Gain ****
        //gainConfig.labels.push('10.09.2021');
        //gainConfig.labels.push('11.09.2021');
        //gainConfig.data.push(1500);
        //gainConfig.data.push(700);
        // **** /Gain ****

        // **** Order ****
        //orderConfig.labels.push('10.09.2021');
        //orderConfig.labels.push('11.09.2021');
        //orderConfig.data.push(8);
        //orderConfig.data.push(2);
        // **** /Order ****

        const gainCtx = this.gainRef.nativeElement.getContext('2d');
        const orderCtx = this.orderRef.nativeElement.getContext('2d');
        gainCtx.canvas.height = '300px';
        orderCtx.canvas.height = '300px';

        new Chart(gainCtx, createChartConfig(gainConfig) as any);
        new Chart(orderCtx, createChartConfig(orderConfig) as any);

        this.pending = false;
      });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

function createChartConfig({ labels, data, label, color }) {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
  };
}
