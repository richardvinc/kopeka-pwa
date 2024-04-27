import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  templateUrl: './bottom-menu.component.html',
  imports: [RouterLinkActive, RouterLink],
})
export class BottomMenuComponent {
  constructor() {}
}
