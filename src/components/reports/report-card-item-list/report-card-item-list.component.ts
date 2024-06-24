import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '@app/libs/reports/interfaces/report.interface';
import { CategoryHashtagPipe } from '@app/shared/pipes/category-hashtag.pipe';
import { FromNowPipe } from '@app/shared/pipes/date-from-now.pipe';

import { ReportInfoCardComponent } from '../report-info-card/report-info-card.component';

@Component({
  selector: 'app-report-card-item-list',
  standalone: true,
  templateUrl: './report-card-item-list.component.html',
  imports: [
    CommonModule,
    CategoryHashtagPipe,
    FromNowPipe,
    ReportInfoCardComponent,
  ],
})
export class ReportCardItemListComponenet {
  @Output() clicked = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();
  @Output() liked = new EventEmitter<string>();
  @Output() unliked = new EventEmitter<string>();
  @Input({ required: true }) report!: Report;
  @Input({ required: true }) userId!: string;

  showDropdownMenu = false;

  goToReportDetail(reportId: string) {
    this.clicked.emit(reportId);
  }

  deleteReport(reportId: string) {
    this.deleted.emit(reportId);
    this.showDropdownMenu = false;
  }

  likeReport(reportId: string) {
    this.report.is_reacted = true;
    this.report.total_reaction += 1;
    this.liked.emit(reportId);
  }

  unlikeReport(reportId: string) {
    this.report.is_reacted = false;
    if (this.report.total_reaction > 0) {
      this.report.total_reaction -= 1;
      this.unliked.emit(reportId);
    }
  }
}
