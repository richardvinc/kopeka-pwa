import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContainerComponent } from '../shared/components/container/container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet/>',
  styleUrl: './app.component.scss',
  imports: [ContainerComponent, RouterOutlet],
})
export class AppComponent {}
