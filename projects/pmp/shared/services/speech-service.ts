import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  private synth = window.speechSynthesis;
  private language = 'nl-NL';

  speak(text: string) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.language;
    utterance.rate = 0.7; // Speed of speech
    utterance.pitch = 1; // Pitch of the voice
    utterance.volume = 1; // Volume (0 to 1)
    utterance.voice =
      this.synth.getVoices().find((voice) => voice.lang === this.language) ||
      null;
    this.synth.speak(utterance);
  }
}
