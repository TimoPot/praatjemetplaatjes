import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Card } from '../card/card';
import { SpeechService } from 'projects/lmz/services/speech-service';

@Component({
  selector: 'lmz-cards',
  templateUrl: './cards.html',
  styleUrls: ['./cards.scss'],
  imports: [Card],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cards {
  cards = input.required<{ category?: string; text: string; src: string }[]>();

  speechService = inject(SpeechService);
}
