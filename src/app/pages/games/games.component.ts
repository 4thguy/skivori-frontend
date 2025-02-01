import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardGameComponent } from '../../components/card-game/card-game.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SearchComponent } from '../../components/search/search.component';
import { Game } from '../../interfaces/game.interface';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-games',
  imports: [
    CardGameComponent,
    LoadingComponent,
    SearchComponent,
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit, OnDestroy {

  games: Game[] | null = null;
  originalGames: Game[] | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private gamesService: GamesService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.gamesService
      .getGames()
      .subscribe(games => {
        this.games = games
        this.originalGames = games;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onQueryChange(query: string): void {
    if (query === '') {
      this.games = this.originalGames;
    } else {
      this.subscriptions.add(this.gamesService
        .findGames(query)
        .subscribe(games => {
          this.games = games
        }));
    }
  }
}

