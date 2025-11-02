import {
  Component,
  ChangeDetectionStrategy,
  signal,
  input,
} from '@angular/core';

@Component({
  selector: 'pmp-bottom-bar',
  templateUrl: './bottom-bar.html',
  styleUrl: './bottom-bar.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomBar {
  readonly version = input('0.0.0');
  readonly updateStatus = input<'idle' | 'updating' | 'ready' | 'error'>(
    'idle',
  );
}
