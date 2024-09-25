import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CpfUtilValidator {
  static validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value;
      if (!cpf) {
        return null; // Ignore empty values to allow required validator to handle them
      }

      // Remove non-numeric characters
      const cleanedCpf = cpf.replace(/\D/g, '');

      // Check for 11 digits
      if (cleanedCpf.length !== 11) {
        return { invalidCpf: true };
      }

      // Check for all same digits
      if (/^(\d)\1+$/.test(cleanedCpf)) {
        return { invalidCpf: true };
      }

      // Validate CPF using its algorithm
      let sum = 0;
      let remainder;

      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanedCpf.substring(i - 1, i), 10) * (11 - i);
      }

      remainder = (sum * 10) % 11;

      if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
      }

      if (remainder !== parseInt(cleanedCpf.substring(9, 10), 10)) {
        return { invalidCpf: true };
      }

      sum = 0;

      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanedCpf.substring(i - 1, i), 10) * (12 - i);
      }

      remainder = (sum * 10) % 11;

      if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
      }

      if (remainder !== parseInt(cleanedCpf.substring(10, 11), 10)) {
        return { invalidCpf: true };
      }

      return null;
    };
  }
}
