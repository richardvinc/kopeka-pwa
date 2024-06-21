import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-logout-page',
  template: ``,
  standalone: true,
})
export class LogoutPageComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.logout();
    await this.router.navigate(['/explore']);
  }
}
