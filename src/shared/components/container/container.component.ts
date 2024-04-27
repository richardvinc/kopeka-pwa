import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BottomMenuComponent } from '../bottom-menu/bottom-menu.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BottomMenuComponent],
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  constructor() {}
}
