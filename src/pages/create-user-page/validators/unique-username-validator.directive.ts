import { catchError, map, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '@app/libs/users/user.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkUsernameAvailability(control.value).pipe(
      // If the username is taken, return an error object. Otherwise, return null.
      map((isTaken) => (isTaken ? { uniqueUsername: control.value } : null)),
      catchError(() => of(null))
    );
  }
}
