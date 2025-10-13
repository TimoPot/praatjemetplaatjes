import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { SpeechService } from 'projects/pmp/services/speech-service';
import { CommonModule } from '@angular/common';
import { Card as CardI } from 'projects/pmp/shared/interfaces/card';
import { Card } from '../card/card';

@Component({
  selector: 'pmp-cards',
  templateUrl: './cards.html',
  styleUrls: ['./cards.scss'],
  imports: [Card, CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cards {
  cards = input.required<CardI[]>();

  speechService = inject(SpeechService);
}
