import {
  patchState,
  signalStore,
  type,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import {
  addEntities,
  entityConfig,
  withEntities,
} from "@ngrx/signals/entities";
import { BoardGame } from "./boardgame.model";
import { computed, inject, isDevMode } from "@angular/core";
import { catchError, exhaustMap, pipe, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { BoardgamesDataService } from "./services/boardgames-data.service";


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
      if (isDevMode()) {
        watchState(store, (state) => {
          console.log('[BoardgamesStore]', state);
        });
      }
    },
  }),
);

