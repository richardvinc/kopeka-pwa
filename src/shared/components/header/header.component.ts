import { CommonModule } from '@angular/common';
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
  title: string = 'Homeeeeeeeee';
  constructor(
    private router: Router,
    private appConfigService: AppConfigService
  ) {
    this.$title = this.appConfigService.getPageTitle().subscribe((title) => {
      this.title = title;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.$title.unsubscribe();
  }

  goToHome() {
    this.router.navigate(['/home']);
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
