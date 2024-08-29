import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTelefoneMask]',
  standalone: true
})
export class TelefoneMaskDirective {

  private readonly phonePattern = '(00) 00000-0000';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    // Limita o valor a 11 dígitos (código de área + telefone)
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    input.value = this.applyMask(value);
  }

  private applyMask(value: string): string {
    let maskedValue = value;

    if (value.length > 2) {
      maskedValue = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    }
    if (value.length > 7) {
      maskedValue = maskedValue.slice(0, 9) + '-' + maskedValue.slice(9);
    }

    return maskedValue;
  }

}
