import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    public http: HttpClient,
  ) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.apiUrl}/data/games`);
  }

  findGames(query: string): Observable<Game[]> {
    const search = query.toLowerCase().trim();

    if (search.length < 3) {
      return throwError(() => new Error('Query must be at least 3 characters long.'));
    }

    return this.http.post<Game[]>(`${environment.apiUrl}/data/games/find`, {
      query: query,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
