import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-card-game',
  imports: [RouterModule],
  templateUrl: './card-game.component.html',
  styleUrl: './card-game.component.scss'
})
export class CardGameComponent {
  @Input() game: Game | null = null;
  @Input() additionalClasses: string[] | null = null;
}
