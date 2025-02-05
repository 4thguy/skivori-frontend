import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/game.interface';
import { Paged } from '../interfaces/paged.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    public http: HttpClient,
  ) { }

  /*
  * Retrieves a list of games from the API.
  * @param page - The page number to retrieve.
  * @returns An Observable that emits the list of games.
  */
  getGames(page: number = 1): Observable<Paged<Game>> {
    return this.http.get<Paged<Game>>(`${environment.apiUrl}/data/games?page=${page}`);
  }

  /*
  * Searches for games based on a query string and retrieves the results.
  * @param query - The search query to use.
  * @param page - The page number to retrieve.
  * @returns An Observable that emits the list of games matching the query.
  */
  findGames(query: string, page: number = 1): Observable<Paged<Game>> {
    const search = query.toLowerCase().trim();

    if (search.length < 3) {
      return throwError(() => new Error('Query must be at least 3 characters long.'));
    }

    return this.http.post<Paged<Game>>(`${environment.apiUrl}/data/games/find`, {
      query: query,
      page: page,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
