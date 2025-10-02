import { Component } from '@angular/core';

@Component({
  selector: 'lmz-categories',
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
})
export class Categories {
  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    speechSynthesis.speak(utterance);
  }
}
