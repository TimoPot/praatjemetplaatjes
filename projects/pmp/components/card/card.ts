import { LowerCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { BoardService } from 'projects/pmp/shared/data-access/board-service';
import { Card as CardI } from 'projects/pmp/shared/interfaces/card';

@Component({
  selector: 'pmp-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly card = input<CardI>();

  readonly enounce = output<string>();

  boardService = inject(BoardService);

  // capitalizedName = computed(() => {
  //   const name = this.card()!.name;
  //   return name.charAt(0).toUpperCase() + name.slice(1);
  // });
}
