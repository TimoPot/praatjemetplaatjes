import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Cards } from 'projects/pmp/components/cards/cards';
import { BoardService } from 'projects/pmp/shared/data-access/board-service';

@Component({
  selector: 'pmp-board',
  templateUrl: './board.html',
  styleUrl: './board.scss',
  standalone: true,
  imports: [Cards, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {
  boardService = inject(BoardService);

  title = 'Praatje met plaatjes';

  constructor() {
    this.boardService.selectHome();
  }
}
