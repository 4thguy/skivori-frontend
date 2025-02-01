import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { CardGameComponent } from '../../components/card-game/card-game.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Game } from '../../interfaces/game.interface';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-games',
  imports: [
    CardGameComponent,
    LoadingComponent,
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

  gamesSignal: Signal<Game[] | null>;

  constructor(private gamesService: GamesService) {
    const games$: Observable<Game[]> = this.gamesService.getGames();
    this.gamesSignal = toSignal(games$, { initialValue: null });
  }
}

