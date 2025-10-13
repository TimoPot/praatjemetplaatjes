import { LowerCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Card as CardI } from 'projects/pmp/shared/interfaces/card';

@Component({
  selector: 'pmp-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  standalone: true,
  imports: [LowerCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly card = input<CardI>();

  readonly enounce = output<string>();

  private router = inject(Router);

  navigateIntoCard(id: number) {
    // TODO: navigate to the card's detail view or perform another action
    console.log(`TODO: Navigate into card with id ${id} `);
  }
}
