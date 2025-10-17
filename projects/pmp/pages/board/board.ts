import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cards } from 'projects/pmp/components/cards/cards';
import { BoardService } from 'projects/pmp/shared/data-access/board-service';
import { NavBar } from 'projects/pmp/components/nav-bar/nav-bar';
import { NavLinksBar } from 'projects/pmp/components/nav-links-bar/nav-links-bar';

@Component({
  selector: 'pmp-board',
  templateUrl: './board.html',
  styleUrl: './board.scss',
  standalone: true,
  imports: [Cards, NavBar, NavLinksBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {
  boardService = inject(BoardService);

  title = 'Praatje met plaatjes';

  constructor() {
    // start with home board
    this.boardService.selectHome();
  }
}
