import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Card } from '../card/card';
import { SpeechService } from 'projects/lmz/services/speech-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lmz-cards',
  templateUrl: './cards.html',
  styleUrls: ['./cards.scss'],
  imports: [Card, CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cards {
  cards = input.required<{ category?: string; text: string; src: string }[]>();

  speechService = inject(SpeechService);
}
