import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import {
  addEntities,
  SelectEntityId,
  withEntities,
} from "@ngrx/signals/entities";
import { BoardGame } from "./boardgame.model";
import { computed, inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, exhaustMap, Observable, pipe, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

const selectId: SelectEntityId<BoardGame> = (bg) => bg.gameId;

export const BoardgamesStore = signalStore(
  {
    providedIn: "root",
  },
  withEntities<BoardGame>(),
  withState<{ search: string }>({ search: "" }),
  withComputed((store) => {
    return {
      filteredBoardGames: computed(() => {
        if (store.search()) {
          return store.entities().filter(bg => bg.name?.toLocaleLowerCase().includes(store.search().toLocaleLowerCase()))
        } else {
          return store.entities()
        }
      })
    }
  }),
  withMethods((store) => {
    const dataService = inject(BoardgamesDataService);
    return {
      updateSearchTerm: (search: string) => {
        patchState(store, { search })
      },
      loadHotness: rxMethod<void>(
        pipe(
          exhaustMap(() => dataService.getHotness()),
          tap((boardgames) =>
            patchState(store, addEntities(boardgames, { selectId })),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store.loadHotness();
    },
  }),
);

@Injectable({ providedIn: "root" })
export class BoardgamesDataService {
  private http = inject(HttpClient);

  public getHotness(): Observable<BoardGame[]> {
    return this.http
      .get<BoardGame[]>("https://bgg-json.azurewebsites.net/hot")
      .pipe(
        catchError((e) => {
          console.error(e);
          return [];
        }),
      );
  }
}
