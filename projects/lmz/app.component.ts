import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiComponent } from '@ui/components/ui.component';
import { UiMainComponent } from '@ui/components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, UiComponent, UiMainComponent],
})
export class AppComponent {
  title = 'Laat Maar Zien`';
}
