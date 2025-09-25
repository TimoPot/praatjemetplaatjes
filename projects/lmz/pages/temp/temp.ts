import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lmz-temp',
  templateUrl: './temp.html',
  styleUrls: ['./temp.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Temp {}
