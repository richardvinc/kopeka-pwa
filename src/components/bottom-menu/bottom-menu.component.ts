import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  templateUrl: './bottom-menu.component.html',
  imports: [RouterLinkActive, RouterLink],
})
export class BottomMenuComponent {
  constructor(private router: Router) {}

  goToCamera() {
    this.router.navigate(['/camera']);
  }
}
