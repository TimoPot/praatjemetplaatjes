import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  private synth = window.speechSynthesis;
  private language = 'nl-NL';
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth.onvoiceschanged = () => {
      const voices = this.synth.getVoices();
      const dutchVoice = voices.find((v) => v.lang === this.language);
      if (dutchVoice) {
        this.voice = dutchVoice;
      }
    };
  }

  speak(text: string) {
    if (!text) return;

    if (this.synth.speaking) {
      //  **Cancel** any speech currently in progress
      this.synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.language;
    utterance.rate = 0.65; // Speed of speech
    utterance.pitch = 1; // Pitch of the voice
    utterance.volume = 1; // Volume (0 to 1)
    utterance.voice = this.voice || null;
    this.synth.speak(utterance);
  }
}
