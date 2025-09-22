import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UICard, UiMainComponent, UiTopbarComponent } from '@ui/public-api';

@Component({
  selector: 'lmz-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiMainComponent, UiTopbarComponent, UICard],
})
export class MainComponent {}
