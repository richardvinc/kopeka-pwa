import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [CommonModule, RouterLink],
})
export class HeaderComponent implements OnInit, OnDestroy {
  $title;
  $showBackButton;
  title: string = 'Home';
  showBackButton: boolean = false;

  constructor(
    private router: Router,
    private appConfigService: AppConfigService,
    private location: Location
  ) {
    this.$title = this.appConfigService.getPageTitle().subscribe((title) => {
      this.title = title;
    });
    this.$showBackButton = this.appConfigService
      .getShowBackButton()
      .subscribe((status) => {
        this.showBackButton = status;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.$title.unsubscribe();
  }

  goBack() {
    this.location.back();
  }
  goToExplore() {
    this.router.navigate(['/explore']);
  }
  goToTimeline() {
    this.router.navigate(['/timeline']);
  }
  goToMap() {
    this.router.navigate(['/map']);
  }
  goToReport() {
    this.router.navigate(['/report']);
  }
  goToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
