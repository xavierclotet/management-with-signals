import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import {
  addEntities,
  entityConfig,
  SelectEntityId,
  withEntities,
} from "@ngrx/signals/entities";
import { BoardGame } from "./boardgame.model";
import { computed, inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, delay, exhaustMap, finalize, Observable, pipe, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

const boardgameConfig = entityConfig({
  entity: type<BoardGame>(),
  collection: 'boardgame',
  selectId: (bg) => bg.gameId,
});

export const BoardgamesStore = signalStore(
  {
    providedIn: "root",
  },
  withEntities(boardgameConfig),
  withState<{
    search: string,
    isLoading: boolean,
  }>({ search: "", isLoading: false }),
  withComputed((store) => {
    return {
      filteredBoardGames: computed(() => {
        if (store.search()) {
          return store.boardgameEntities().filter(bg => bg.name?.toLocaleLowerCase().includes(store.search().toLocaleLowerCase()))
        } else {
          return store.boardgameEntities()
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
          tap(() => patchState(store, { isLoading: true })),
          exhaustMap(() => dataService.getHotness().pipe(
            tap((boardgames) => {
              patchState(store, (state) => ({
                ...addEntities(boardgames, boardgameConfig)(state),
                isLoading: false
              }));
            }),
            catchError((error) => {
              console.error('Error loading hotness:', error);
              patchState(store, { isLoading: false })
              return [];
            })
          )),
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
