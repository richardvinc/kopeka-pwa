import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import { ReportService } from '@app/shared/services/report/report.service';

@Component({
  selector: 'app-report-form-page',
  standalone: true,
  templateUrl: './report-form-page.component.html',
  imports: [CommonModule],
})
export class ReportFormPageComponent {
  categories: { id: number; name: string; selected: boolean }[] = [
    { id: 1, name: 'Zebra Cross', selected: false },
    { id: 2, name: 'Trotoar', selected: false },
    { id: 3, name: 'Pelican Crossing', selected: false },
  ];
  condition: 'GOOD' | 'BAD' | null = null;
  imageData: string | undefined = undefined;

  constructor(
    private appConfigService: AppConfigService,
    private reportService: ReportService,
    private router: Router
  ) {
    this.appConfigService.setPageTitle('Report');
    this.reportService.$imageData().subscribe((data) => {
      if (!data) {
        this.router.navigate(['/explore']);
      }
      this.imageData = data;
    });
  }

  toggleCategory(id: number) {
    this.categories.map((category) => {
      if (category.id === id) {
        category.selected = !category.selected;
      }
    });
  }

  toggleCondition(condition: 'GOOD' | 'BAD') {
    this.condition = condition;
  }

  submitReport() {
    console.log('Submit Report');
    console.log(
      'Categories:',
      this.categories.filter((category) => category.selected)
    );
    console.log('Condition:', this.condition);
  }
}
