import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';

@Component({
  selector: 'ui-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMainComponent {
  sectionTitle = input('Titel');
}
