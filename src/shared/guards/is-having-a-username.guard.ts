import { map } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../../libs/users/user.service';

export const IsHavingAUsernameGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isHavingUsername().pipe(
    map((isHavingUsername) => {
      if (isHavingUsername) {
        return true;
      } else {
        router.navigate(['/create-user']);
        return false;
      }
    })
  );
};
