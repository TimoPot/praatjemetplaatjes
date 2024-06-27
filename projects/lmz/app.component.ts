import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiComponent } from '@ui/components/ui.component';
import { MainComponent } from '@ui/components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, UiComponent, MainComponent],
})
export class AppComponent {
  title = 'Laat Maar Zien`';
}
