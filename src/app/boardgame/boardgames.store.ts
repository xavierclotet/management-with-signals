import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { addEntities, SelectEntityId, withEntities } from "@ngrx/signals/entities";
import { BoardGame } from "./boardgame.model";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, exhaustMap, Observable, pipe, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

const selectId: SelectEntityId<BoardGame> = (bg) => bg.gameId;

export const BoardgamesStore = signalStore(
  {
    providedIn: 'root',
  },
  withEntities<BoardGame>(),
  //withState(initialState)
  withMethods((store) => {
    const dataService = inject(BoardgamesDataService);
    return {
      loadHotness: rxMethod<void>(
        pipe(
          exhaustMap(() => dataService.getHotness()),
          tap(boardgames => patchState(store, addEntities(boardgames, { selectId })))
        )
      )
    }
  }),
  withHooks({
    onInit(store) {
      if (store.entities().length === 0) {
        store.loadHotness();
      }
    },
  })
);

@Injectable({ providedIn: 'root' })
export class BoardgamesDataService {
  private http = inject(HttpClient);

  public getHotness(): Observable<BoardGame[]> {
    return this.http.get<BoardGame[]>('https://bgg-json.azurewebsites.net/hot').pipe(
      catchError(e => {
        console.error(e);
        return [];
      })
    )
  }


}
