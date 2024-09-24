import { Component, computed, inject, input } from '@angular/core';
import { BoardgamesStore } from '../boardgames.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boardgame-detail',
  standalone: true,
  imports: [CommonModule],
  providers: [BoardgamesStore],
  templateUrl: './boardgame-detail.component.html',
  styleUrl: './boardgame-detail.component.scss'
})
export class BoardgameDetailComponent {
  protected boardgameSore = inject(BoardgamesStore);
  protected id = input.required<number>();
  protected boardgame = computed(() => this.boardgameSore.entityMap()[this.id()]);
}
