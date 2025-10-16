import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { BoardService } from 'projects/pmp/shared/data-access/board-service';

@Component({
  selector: 'pmp-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  boardService = inject(BoardService);

  getLeftId(currentId: number, fromIds: number[]): number {
    const isCurrentId = (id: number) => id === currentId;
    const index = fromIds.findIndex(isCurrentId);
    const leftIdx = fromIds[index - 1] || fromIds[fromIds.length - 1];
    console.log(`left index: ${leftIdx}`);
    return leftIdx;
  }
}
