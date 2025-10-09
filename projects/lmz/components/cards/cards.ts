import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Card } from '../card/card';
import { SpeechService } from 'projects/lmz/services/speech-service';
import { CommonModule } from '@angular/common';
import { Category } from 'projects/lmz/shared/interfaces/category';

@Component({
  selector: 'lmz-cards',
  templateUrl: './cards.html',
  styleUrls: ['./cards.scss'],
  imports: [Card, CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cards {
  cards = input.required<Category[]>();

  speechService = inject(SpeechService);
}
