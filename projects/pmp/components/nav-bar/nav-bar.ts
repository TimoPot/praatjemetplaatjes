import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  BoardService,
  navigationStackTuple,
} from 'projects/pmp/shared/data-access/board-service';

@Component({
  selector: 'pmp-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  navigationStack = input.required<navigationStackTuple[]>();

  boardService = inject(BoardService);
}
