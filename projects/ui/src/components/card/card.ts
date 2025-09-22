import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UICard {}
