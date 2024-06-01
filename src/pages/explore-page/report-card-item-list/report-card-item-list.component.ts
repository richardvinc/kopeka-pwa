import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '@app/shared/interfaces/report.interface';

@Component({
  selector: 'app-report-card-item-list',
  standalone: true,
  templateUrl: './report-card-item-list.component.html',
  imports: [CommonModule],
})
export class ReportCardItemListComponenet {
  @Output() clicked = new EventEmitter<string>();
  @Input() report: Report | null = null;

  goToReportDetail(reportId: string) {
    this.clicked.emit(reportId);
  }
}
