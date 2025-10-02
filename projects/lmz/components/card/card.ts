import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lmz-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly text = input.required<string>();
  readonly src = input.required<string>();

  speak(text: string) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    speechSynthesis.speak(utterance);
  }
}
