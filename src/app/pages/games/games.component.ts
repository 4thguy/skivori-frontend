import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CardGameComponent } from '../../components/card-game/card-game.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SearchComponent } from '../../components/search/search.component';
import { FetchStatusEnum } from '../../enum/fetch-status.enum';
import { Game } from '../../interfaces/game.interface';
import { Paged } from '../../interfaces/paged.interface';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-games',
  imports: [
    CardGameComponent,
    LoadingComponent,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit, OnDestroy {

  games: Paged<Game> | null = null;

  status: FetchStatusEnum = FetchStatusEnum.LOADING;
  STATUS = FetchStatusEnum;

  private query: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private gamesService: GamesService,
  ) {
  }

  ngOnInit(): void {
    const fetch = this.gamesService.getGames(1);
    this.fetchGames(fetch);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onQueryChange(query: string): void {
    query = query.trim();
    this.query = query;
    const fetch = this.query.length === 0
      ? this.gamesService.getGames(1)
      : this.gamesService.findGames(this.query, 1)
    this.fetchGames(fetch);
  }

  onPageChange(page: number): void {
    if (this.games && page > 0 && page <= this.games.totalPages) {
      const fetch = this.query.length === 0
        ? this.gamesService.getGames(page)
        : this.gamesService.findGames(this.query, page)
      this.fetchGames(fetch);
    }
  }

  private fetchGames(fetch: Observable<Paged<Game>>) {
    this.status = FetchStatusEnum.LOADING;
    this.subscriptions.add(fetch
      .subscribe({
        next: (games) => {
          this.games = games;
          this.status = FetchStatusEnum.SUCCESS;
        },
        error: (err) => {
          console.error('Error fetching games:', err);
          this.status = FetchStatusEnum.ERROR;
        }
      }));
  }
}
