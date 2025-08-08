import { UiMainComponent } from '@ui/components/main/main.component';
import { UiTopbarComponent } from '@ui/components/topbar/topbar.component';

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lmz-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [UiMainComponent, UiTopbarComponent]
})
export class MainComponent {}
