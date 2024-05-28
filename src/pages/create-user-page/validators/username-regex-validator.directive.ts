import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function UsernameRegexValidator(): ValidatorFn {
  const nameRe = /^[a-z0-9._]{5,20}$$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const isAccepted = nameRe.test(control.value);

    // return null if username is acceptable
    return isAccepted
      ? null
      : { usernameRegexValidator: { value: control.value } };
  };
}
