import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfCnpjValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const raw = control.value.replace(/\D/g, '');
  if (raw.length < 11 || raw.length > 14) {
    return { invalidLength: true };
  }

  return null;
}
