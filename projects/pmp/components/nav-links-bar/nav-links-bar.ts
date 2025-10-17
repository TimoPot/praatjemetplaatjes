import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { BoardService } from 'projects/pmp/shared/data-access/board-service';
import { Card } from 'projects/pmp/shared/interfaces/card';

@Component({
  selector: 'pmp-nav-links-bar',
  templateUrl: './nav-links-bar.html',
  styleUrl: './nav-links-bar.scss',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLinksBar {
  links = input<Card[]>([]);

  boardService = inject(BoardService);
}
