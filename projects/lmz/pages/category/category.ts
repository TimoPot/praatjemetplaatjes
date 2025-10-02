import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lmz-category',
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Category {}
