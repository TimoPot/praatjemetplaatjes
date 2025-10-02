import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  private synth = window.speechSynthesis;

  speak(text: string) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    this.synth.speak(utterance);
  }
}
