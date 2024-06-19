import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '@app/pages/not-found-page/not-found-page.component';
import { ContainerComponent } from '@app/shared/components/container/container.component';
import { IsHavingAUsernameGuard } from '@app/shared/guards/is-having-a-username.guard';
import { IsOnboarded } from '@app/shared/guards/is-onboarded.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'explore',
        pathMatch: 'full',
      },
      {
        path: 'explore',
        loadComponent: () =>
          import('../pages/explore-page/explore-page.component').then(
            (m) => m.ExplorePageComponent
          ),
      },
      {
        path: 'explore/detail/:reportId',
        loadComponent: () =>
          import(
            '../pages/explore-page/explore-detail/explore-detail-page.component'
          ).then((m) => m.ExploreDetailPageComponent),
      },
      {
        path: 'permission',
        loadComponent: () =>
          import('../pages/permission-page/permission-page.component').then(
            (m) => m.PermissionPageComponent
          ),
      },
      {
        path: 'campaign',
        loadComponent: () =>
          import('../pages/campaign-page/campaign-page.component').then(
            (m) => m.CampaignPageComponent
          ),
      },
      {
        path: 'campaign/info',
        loadComponent: () =>
          import(
            '../pages/campaign-page/campaign-info-page/campaign-info-page.component'
          ).then((m) => m.CampaignInfoPageComponent),
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
      {
        path: 'profile/changelog',
        loadComponent: () =>
          import(
            '../pages/profile-page/changelog-page/changelog-page.component'
          ).then((m) => m.ChangelogPageComponent),
      },
    ],
    canActivate: [AuthGuard, IsHavingAUsernameGuard, IsOnboarded],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login']),
      isOnboarded: () => redirectUnauthorizedTo(['onboarding']),
    },
  },
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'explore',
        pathMatch: 'full',
      },
      {
        path: 'camera',
        loadComponent: () =>
          import('../pages/camera-page/camera-page.component').then(
            (m) => m.CameraPageComponent
          ),
      },
    ],
    canActivate: [AuthGuard, IsHavingAUsernameGuard, IsOnboarded],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login']),
    },
  },
  {
    path: 'create-user',
    loadComponent: () =>
      import('../pages/create-user-page/create-user-page.component').then(
        (m) => m.CreateUserPageComponent
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['login']) },
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('../pages/onboarding-page/onboarding-page.component').then(
        (m) => m.OnboardingPageComponent
      ),
    canActivate: [AuthGuard, IsHavingAUsernameGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['login']) },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['explore']) },
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('../pages/logout-page/logout-page.component').then(
        (m) => m.LogoutPageComponent
      ),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
