import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function idadeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dataNascimento = control.value;

    if (!dataNascimento) {
      return null; // Se não houver valor, não aplicar validação
    }

    const [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const dataNasc = new Date(ano, mes - 1, dia); // Mês começa em 0
    const idade = new Date().getFullYear() - dataNasc.getFullYear();
    const mesAtual = new Date().getMonth();
    const diaAtual = new Date().getDate();

    // Verifica se a pessoa é menor de idade
    if (idade < 18 || (idade === 18 && (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)))) {
      return { menorDeIdade: true }; // Retorna erro se menor de idade
    }

    return null; // Retorna null se não houver erro
  };
}
