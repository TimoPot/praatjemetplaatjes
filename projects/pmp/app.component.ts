import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpdateService } from './app.update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {
  private readonly updateService = inject(UpdateService);

  title = 'Praat met plaatjes';

  // CON: laptops with touch screens are considere mobile also
  // isMobile = this._isMobile();

  // private _isMobile(): boolean {
  //   // Check for maxTouchPoints > 0 (modern browsers)
  //   const check = 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0;
  //   console.log(`isMobile: ${check}`);
  //   return check;
  // }
}
