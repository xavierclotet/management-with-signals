import { Component, computed, effect, inject, input, signal } from "@angular/core";
import { BoardgamesStore } from "../boardgames.store";
import { switchMap, catchError, of, finalize, tap } from "rxjs";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { BoardgamesDataService } from "../services/boardgames-data.service";
import { DecodeHtmlPipe } from "../../data/core/pipes";
import { BoardgameDetails } from "./boardgame-detail.model";


@Component({
  selector: "app-boardgame-detail",
  standalone: true,
  imports: [CommonModule, DecodeHtmlPipe],
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


  protected isLoading = signal(false)
  protected error = signal(false)
  protected boardgameDetails = signal<BoardgameDetails | null>(null)

  constructor() {
    toObservable(this.id)
    .pipe(
      takeUntilDestroyed(),
      switchMap((id) => {
        this.isLoading.set(true)
        return this.boardgameDataService.getBoardgameDetails(id).pipe(
          tap((details) => {
            this.error.set(false)
            if (!details) {
              this.error.set(true)
            } else {
              this.boardgameDetails.set(details)
            }
          }),
          finalize(() => this.isLoading.set(false)),
          catchError(() => {
            this.error.set(true)
            return of(null)
          }),
        )
      }),
    )
    .subscribe()
    /* effect(() => {
      this.isLoading.set(true)
      const subscription = this.boardgameDataService.getBoardgameDetails(this.id()).pipe(
        tap((details) => {
          this.error.set(false)
          if (!details) {
            this.error.set(true)
          } else {
            this.boardgameDetails.set(details)
          }
        }),
        finalize(() => this.isLoading.set(false)),
        catchError(() => {
          this.error.set(true)
          return of(null)
        })
      ).subscribe()

      return () => subscription.unsubscribe()
    }, { allowSignalWrites: true }) */
  }


  navigateToBgg(gameId: number) {
    const url = `https://boardgamegeek.com/boardgame/${gameId}`;
    window.open(url, '_blank');
  }
}
