import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'Laat Maar Zien`';

  // CON: laptops with touch screens are considere mobile also
  // isMobile = this._isMobile();

  // private _isMobile(): boolean {
  //   // Check for maxTouchPoints > 0 (modern browsers)
  //   const check = 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0;
  //   console.log(`isMobile: ${check}`);
  //   return check;
  // }
}
