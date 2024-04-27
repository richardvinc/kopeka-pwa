import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [CommonModule, RouterLink],
})
export class HeaderComponent {
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/home']);
    this.showMenu = false;
  }
  goToTimeline() {
    this.router.navigate(['/timeline']);
    this.showMenu = false;
  }
  goToMap() {
    this.router.navigate(['/map']);
    this.showMenu = false;
  }
  goToReport() {
    this.router.navigate(['/report']);
    this.showMenu = false;
  }
  goToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
    this.showMenu = false;
  }
}
