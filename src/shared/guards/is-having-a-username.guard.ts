import { map } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { UserService } from '../services/user/user.service';

export const IsHavingAUsernameGuard: CanActivateFn = () => {
  const userService = inject(UserService);

  return userService.getSelf().pipe(
    map((user) => {
      // if user is having a username, return true
      if (user && user.username) {
        return true;
      }

      return false;
    })
  );
};
