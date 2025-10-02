import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cards } from 'projects/lmz/components/cards/cards';

@Component({
  selector: 'lmz-categories',
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
  imports: [Cards],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories {
  data = signal([
    { text: 'Huis', src: './images/huis.jpg' },
    { text: 'Boom', src: './images/boom.jpg' },
    { text: 'Auto', src: './images/auto.png' },
  ]);

  speak(text: string) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    speechSynthesis.speak(utterance);
  }
}
