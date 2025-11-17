import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpdateService } from './app.update.service';
import { DeviceDetectorService } from './shared/services/device-detector-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly deviceDetector = inject(DeviceDetectorService);
  private readonly updateService = inject(UpdateService);

  title = 'Praat met plaatjes';
}
