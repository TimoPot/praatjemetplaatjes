import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-topbar',
  imports: [],
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTopbarComponent {}
