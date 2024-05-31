import { map } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { UserService } from '../services/user/user.service';

export const IsHavingAUsernameGuard: CanActivateFn = () => {
  const userService = inject(UserService);

  return userService
    .isHavingUsername()
    .pipe(map((isHavingUsername) => isHavingUsername));
};
