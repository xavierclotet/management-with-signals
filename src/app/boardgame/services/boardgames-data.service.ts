import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BoardGame } from '../boardgame.model';
import { BoardgameDetails } from '../boardgame-detail';

@Injectable({
  providedIn: 'root'
})
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

  /**
   * getBoardgameDetail
   */
  public getBoardgameDetails(gameId: number): Observable<BoardgameDetails> {
    return this.http
      .get<BoardgameDetails>(`https://bgg-json.azurewebsites.net/thing/${gameId}`)
      .pipe(
        catchError((e) => {
          console.error(e);
          return [];
        }),
      );
  }
}
