import { Component, computed, inject, input } from "@angular/core";
import { BoardgamesStore } from "../boardgames.store";
import { BoardgamesDataService } from "../services";
import { Observable, switchMap, startWith, catchError, of } from "rxjs";
import { BoardgameDetails } from "./boardgame-detail.model";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-boardgame-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./boardgame-detail.component.html",
  styleUrl: "./boardgame-detail.component.scss",
})
export class BoardgameDetailComponent {
  protected boardgameStore = inject(BoardgamesStore);
  protected id = input.required<number>();
  protected boardgameDataService = inject(BoardgamesDataService);
  protected boardgame = computed(
    () => this.boardgameStore.boardgameEntityMap()[this.id()]
  );
  protected boardgameDetails$ = toObservable(this.id).pipe(
    switchMap(id => this.boardgameDataService.getBoardgameDetails(id).pipe(catchError(() => of(null)))),
  );


  navigateToBgg(gameId: number) {
    const url = `https://boardgamegeek.com/boardgame/${gameId}`;
    window.open(url, '_blank');
  }
}
