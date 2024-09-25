import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDataNascimentoMask]',
  standalone: true
})
export class DataNascimentoMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove tudo que não for dígito

    if (value.length > 8) {
      value = value.slice(0, 8); // Limita a 8 dígitos (ddmmyyyy)
    }

    input.value = this.applyMask(value);
  }

  private applyMask(value: string): string {
    let maskedValue = '';

    // Aplica a máscara com base no comprimento do valor
    if (value.length <= 2) {
      maskedValue = value; // Apenas o dia
    } else if (value.length <= 4) {
      maskedValue = value.slice(0, 2) + '/' + value.slice(2); // Dia/Mês
    } else {
      maskedValue = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4); // Dia/Mês/Ano
    }

    return maskedValue;
  }

}
