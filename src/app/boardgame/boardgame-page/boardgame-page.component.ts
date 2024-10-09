import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { BoardgamesStore } from "../boardgames.store";
import { CommonModule } from "@angular/common";
import { BoardgameCardComponent } from "../boardgame-card/boardgame-card.component";

@Component({
  selector: "app-boardgame-page",
  standalone: true,
  imports: [CommonModule, BoardgameCardComponent],
  templateUrl: "./boardgame-page.component.html",
  styleUrl: "./boardgame-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardgamePageComponent {
  readonly store = inject(BoardgamesStore);

}
