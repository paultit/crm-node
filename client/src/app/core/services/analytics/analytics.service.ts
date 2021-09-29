import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AnalyticsPage } from 'src/app/shared/interfaces/analyticsPage/analyticsPage';
import { OverviewPage } from 'src/app/shared/interfaces/overviewPage/overviewPage';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  constructor(private http: HttpClient) {}

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview');
  }

  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/analytics');
  }
}
