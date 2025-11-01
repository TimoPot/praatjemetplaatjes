import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class UpdateService {
  constructor(private swUpdate: SwUpdate) {
    if (swUpdate.isEnabled) {
      swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          console.log('New version ready, updating...');
          this.activateUpdate();
        }
      });
    }
  }

  private async activateUpdate() {
    try {
      const lastReload = localStorage.getItem('lastReload');
      const now = Date.now();

      if (!lastReload || now - +lastReload > 10_000) {
        localStorage.setItem('lastReload', now.toString());
        await this.swUpdate.activateUpdate();
        document.location.reload();
      }
    } catch (err) {
      console.error('Update activation failed:', err);
    }
  }
}
