import { map } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { UserService } from '../services/user/user.service';

export const IsUserRegisteredGuard: CanActivateFn = () => {
  const userService = inject(UserService);

  return userService.getSelf().pipe(
    map((user) => {
      console.log(user);
      if (user) {
        return true;
      }

      return false;
    })
  );
};
