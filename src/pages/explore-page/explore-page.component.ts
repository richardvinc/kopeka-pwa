import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  templateUrl: './explore-page.component.html',
  imports: [RouterLink],
})
export class ExplorePageComponent {
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Utama');
  }
}
