import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@app/pages/not-found-page/not-found-page.component';
import { ContainerComponent } from '@app/shared/components/container/container.component';

export const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/home-page/home-page.component').then(
            (m) => m.HomePageComponent
          ),
      },
      {
        path: 'timeline',
        loadComponent: () =>
          import('../pages/timeline-page/timeline-page.component').then(
            (m) => m.TimelinePageComponent
          ),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('../pages/map-page/map-page.component').then(
            (m) => m.MapPageComponent
          ),
      },
      {
        path: 'report',
        loadComponent: () =>
          import('../pages/report-form-page/report-form-page.component').then(
            (m) => m.ReportFormPageComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../pages/profile-page/profile-page.component').then(
            (m) => m.ProfilePageComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
