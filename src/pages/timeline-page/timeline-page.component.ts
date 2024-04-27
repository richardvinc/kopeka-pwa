import { Component } from '@angular/core';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-timeline-page',
  standalone: true,
  templateUrl: './timeline-page.component.html',
})
export class TimelinePageComponent {
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Timeline');
  }
}
