import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BoardgamesStore } from "../boardgame/boardgames.store";
import { Router, RouterModule } from "@angular/router";
import { debounceTime, distinctUntilChanged, Subject, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [FormsModule, RouterModule, ThemeSwitcherComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  title = "Boardgames app";
  search = "";
  boardgamesStore = inject(BoardgamesStore);
  router = inject(Router);
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        tap((searchTerm) => this.boardgamesStore.updateSearchTerm(searchTerm)),
      )
      .subscribe();
  }

  updateSearchTerm(): void {
    this.searchSubject.next(this.search);
  }
}
