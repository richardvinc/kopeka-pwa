import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '@app/libs/reports/interfaces/report.interface';
import { CategoryHashtagPipe } from '@app/shared/pipes/category-hashtag.pipe';
import { FromNowPipe } from '@app/shared/pipes/date-from-now.pipe';

@Component({
  selector: 'app-report-info-card',
  templateUrl: './report-info-card.component.html',
  standalone: true,
  imports: [CommonModule, FromNowPipe, CategoryHashtagPipe],
})
export class ReportInfoCardComponent {
  @Input({ required: true }) report!: Report;
  @Input({ required: true }) userId!: string;
  @Output() clicked = new EventEmitter<string>();
  @Output() liked = new EventEmitter<string>();
  @Output() unliked = new EventEmitter<string>();

  constructor() {}

  goToReportDetail() {
    this.clicked.emit(this.report.id);
  }

  likeReport() {
    this.liked.emit(this.report.id);
  }

  unlikeReport() {
    this.unliked.emit(this.report.id);
  }
}
