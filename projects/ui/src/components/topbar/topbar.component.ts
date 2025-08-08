
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ui-topbar',
    imports: [],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTopbarComponent {}
