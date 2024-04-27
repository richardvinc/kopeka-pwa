import { Component } from '@angular/core';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-report-form-page',
  standalone: true,
  templateUrl: './report-form-page.component.html',
})
export class ReportFormPageComponent {
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Report');
  }
}
