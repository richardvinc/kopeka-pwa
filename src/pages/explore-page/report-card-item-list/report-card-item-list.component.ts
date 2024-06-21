import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '@app/libs/reports/interfaces/report.interface';
import { CategoryHashtagPipe } from '@app/shared/pipes/category-hashtag.pipe';
import { FromNowPipe } from '@app/shared/pipes/date-from-now.pipe';

@Component({
  selector: 'app-report-card-item-list',
  standalone: true,
  templateUrl: './report-card-item-list.component.html',
  imports: [CommonModule, CategoryHashtagPipe, FromNowPipe],
})
export class ReportCardItemListComponenet {
  @Output() clicked = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();
  @Output() reacted = new EventEmitter<{
    reportId: string;
    isReacted: boolean;
  }>();
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

  reactToReport(reportId: string) {
    this.report.is_reacted = !this.report.is_reacted;
    this.reacted.emit({ reportId, isReacted: this.report.is_reacted });
  }
}
