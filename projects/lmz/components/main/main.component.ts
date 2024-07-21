import { UiMainComponent } from '@ui/components/main/main.component';
import { UiTopbarComponent } from '@ui/components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lmz-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiMainComponent, UiTopbarComponent],
})
export class MainComponent {}
