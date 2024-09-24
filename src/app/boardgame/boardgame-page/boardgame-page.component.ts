import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoardgamesDataService, BoardgamesStore } from '../boardgames.store';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BoardgameCardComponent } from "../boardgame-card/boardgame-card.component";

@Component({
  selector: 'app-boardgame-page',
  standalone: true,
  imports: [CommonModule, BoardgameCardComponent],
  providers: [BoardgamesStore],
  templateUrl: './boardgame-page.component.html',
  styleUrl: './boardgame-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardgamePageComponent {
  readonly store = inject(BoardgamesStore);

}
