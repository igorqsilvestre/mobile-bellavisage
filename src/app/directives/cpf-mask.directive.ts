import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]',
  standalone: true
})
export class CpfMaskDirective {

  private readonly cpfPattern = '000.000.000-00';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    input.value = this.applyMask(value);
  }

  private applyMask(value: string): string {
    let maskedValue = value;

    if (value.length > 3) {
      maskedValue = value.slice(0, 3) + '.' + value.slice(3);
    }
    if (value.length > 6) {
      maskedValue = maskedValue.slice(0, 7) + '.' + maskedValue.slice(7);
    }
    if (value.length > 9) {
      maskedValue = maskedValue.slice(0, 11) + '-' + maskedValue.slice(11);
    }

    return maskedValue;
  }
}