import { computed, Injectable, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

export interface UpdateState {
  // Define the state properties for the update here
  updateStatus: 'idle' | 'updating' | 'ready' | 'error';
}

@Injectable({ providedIn: 'root' })
export class UpdateService {
  // STATE
  private state = signal<UpdateState>({
    // Initialize the state properties here
    updateStatus: 'idle',
  });

  // SELECTORS
  // Define computed selectors based on the state here
  readonly updateStatus = computed(() => this.state().updateStatus);

  constructor(private swUpdate: SwUpdate) {
    if (swUpdate.isEnabled) {
      swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          console.log('New version ready, updating...');
          this.setUpdateStatus('updating');
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
        this.setUpdateStatus('ready');
        document.location.reload();
      }
    } catch (err) {
      this.setUpdateStatus('error');
      console.error('Update activation failed:', err);
    }
  }

  private setUpdateStatus(status: UpdateState['updateStatus']) {
    this.state.update((state) => ({ ...state, updateStatus: status }));
  }
}
