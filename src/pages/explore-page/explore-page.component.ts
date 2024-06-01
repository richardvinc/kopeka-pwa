import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Report } from '@app/shared/interfaces/report.interface';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import { ReportService } from '@app/shared/services/report/report.service';

import { ReportCardItemListComponenet } from './report-card-item-list/report-card-item-list.component';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  templateUrl: './explore-page.component.html',
  imports: [RouterLink, ReportCardItemListComponenet, InfiniteScrollDirective],
})
export class ExplorePageComponent {
  reports: Report[] = [];
  nextToken: string | null = null;

  constructor(
    private appConfigService: AppConfigService,
    private reportService: ReportService
  ) {
    this.appConfigService.setPageTitle('Utama');
    this.loadMore();
  }

  loadMore() {
    console.log('load more!');
    this.reportService
      .getLatestReport({ next_token: this.nextToken ?? undefined })
      .subscribe((res) => {
        this.reports = this.reports.concat(res.reports);
        this.nextToken = res.nextToken;
      });
  }
}
