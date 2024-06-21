import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '@app/libs/reports/interfaces/report.interface';
import { CategoryHashtagPipe } from '@app/shared/pipes/category-hashtag.pipe';
import { FromNowPipe } from '@app/shared/pipes/date-from-now.pipe';

@Component({
  selector: 'app-report-mini-list',
  templateUrl: './report-mini-list.component.html',
  standalone: true,
  imports: [FromNowPipe, CategoryHashtagPipe, CommonModule],
})
export class ReportMiniListComponent {
  @Input({ required: true }) report!: Report;
  @Output() clicked = new EventEmitter<string>();
  @Output() reacted = new EventEmitter<string>();

  handleClick() {
    this.clicked.emit(this.report.id);
  }

  handleReact() {
    this.reacted.emit(this.report.id);
  }
}
