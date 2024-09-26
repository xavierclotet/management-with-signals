import { Component, computed, inject, input } from "@angular/core";
import { BoardgamesStore } from "../boardgames.store";
import { BoardgamesDataService } from "../services";

@Component({
  selector: "app-boardgame-detail",
  standalone: true,
  imports: [],
  templateUrl: "./boardgame-detail.component.html",
  styleUrl: "./boardgame-detail.component.scss",
})
export class BoardgameDetailComponent {
  protected boardgameSore = inject(BoardgamesStore);
  protected id = input.required<number>();
  protected boardgameDataService = inject(BoardgamesDataService);
  protected boardgame = computed(
    () => {
      //  this.boardgameDataService.getBoardgameDetails(this.id())
      return this.boardgameSore.boardgameEntityMap()[this.id()];
    }
  );

  constructor() {

  }
}
