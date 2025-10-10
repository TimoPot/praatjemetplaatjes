import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Card } from '../card/card';
import { SpeechService } from 'projects/pmp/services/speech-service';
import { CommonModule } from '@angular/common';
import { Category } from 'projects/pmp/shared/interfaces/category';

@Component({
  selector: 'pmp-cards',
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
