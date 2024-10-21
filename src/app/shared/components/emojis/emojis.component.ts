import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.css']
})
export class EmojisComponent implements OnInit {

  @Output() emojiSelecionado = new EventEmitter<string>();

  // Variável para armazenar o emoji atualmente selecionado
  emojiAtual: string | null = null;

  ngOnInit(): void {
  }


  selecionarEmoji(emoji: string) {
    this.emojiAtual = emoji;
    this.emojiSelecionado.emit(emoji);
  }

}
