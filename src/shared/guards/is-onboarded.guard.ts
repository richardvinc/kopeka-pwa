import { map } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../services/user/user.service';

export const IsOnboarded: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isOnboarded().pipe(
    map((isOnboarded) => {
      if (isOnboarded) {
        return true;
      } else {
        router.navigate(['/onboarding']);
        return false;
      }
    })
  );
};
