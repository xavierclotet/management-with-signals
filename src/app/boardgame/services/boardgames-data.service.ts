import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardGame } from '../boardgame.model';
import { BoardgameDetails } from '../boardgame-detail';
import { BoardGameCollection } from '../boardgame-collection';

@Injectable({
  providedIn: 'root'
})
export class BoardgamesDataService {
  private http = inject(HttpClient);

  public getHotness(): Observable<BoardGame[]> {
    return this.http
      .get<BoardGame[]>("https://bgg-json.azurewebsites.net/hot")

  }

  /**
   * getBoardgameDetail
   */
  public getBoardgameDetails(gameId: number): Observable<BoardgameDetails> {
    return this.http
      .get<BoardgameDetails>(`https://bgg-json.azurewebsites.net/thing/${gameId}`);
  }

  public getBoardgameColelction(user: string): Observable<BoardGameCollection[]> {
    return this.http
      .get<BoardGameCollection[]>(`https://bgg-json.azurewebsites.net/collection/${user}`);
  }
}
