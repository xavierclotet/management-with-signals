import { Component, input } from '@angular/core';
import { BoardGame } from '../boardgame.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boardgame-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './boardgame-card.component.html',
  styleUrl: './boardgame-card.component.scss'
})
export class BoardgameCardComponent {
  public boardgame = input.required<BoardGame>();


}
