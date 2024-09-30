import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUtilsService {

  constructor() { }

  gerarHorariosAleatorios(data:Date) {
   // Gerando uma quantidade aleatória entre 1 e 5
   const quantidade = Math.floor(Math.random() * 5) + 1; // Gera um número entre 1 e 5

   const horarios = new Set<Date>(); // Para garantir horários distintos

   // Definindo os horários limites
   const inicio = new Date(data);
   inicio.setHours(7, 0, 0); // 7:00 AM
   const fim = new Date(data);
   fim.setHours(18, 0, 0); // 6:00 PM

   // Gerando horários aleatórios distintos
   while (horarios.size < quantidade) {
       const horarioAleatorio = new Date(
           inicio.getTime() + Math.random() * (fim.getTime() - inicio.getTime())
       );

       // Adicionando o horário aleatório ao Set
       horarios.add(horarioAleatorio);
   }

   // Convertendo o set em uma lista e ordenando
   const listaHorarios = Array.from(horarios).sort((a: Date, b: Date) => a.getTime() - b.getTime());

   return listaHorarios; // Retorna um array de objetos Date
  }
}
