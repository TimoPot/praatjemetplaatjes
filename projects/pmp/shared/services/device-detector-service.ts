import { Injectable, signal } from '@angular/core';

export type DeviceType = 'mobile' | 'tablet' | 'touch-laptop' | 'desktop';

@Injectable({ providedIn: 'root' })
export class DeviceDetectorService {
  private readonly deviceSignal = signal<DeviceType>(this.detect());
  readonly device = this.deviceSignal.asReadonly();

  private detect(): DeviceType {
    const ua = navigator.userAgent.toLowerCase();
    const touchPoints = navigator.maxTouchPoints;
    const coarse = matchMedia('(pointer: coarse)').matches;
    const fine = matchMedia('(pointer: fine)').matches;
    const width = window.screen.width;
    const height = window.screen.height;

    // ---- MOBILE ----
    if (touchPoints > 0 && width < 768 && height < 1200) {
      return 'mobile';
    }

    // ---- TABLET ----
    if (
      touchPoints > 0 &&
      width >= 768 &&
      width <= 1366 &&
      !ua.includes('windows') // avoid Surface classification
    ) {
      return 'tablet';
    }

    // ---- TOUCH LAPTOP ----
    if (
      touchPoints > 0 &&
      ua.includes('windows') &&
      width > 1000 &&
      (fine || // has mouse/trackpad precision
        !coarse) // some hybrids incorrectly report only coarse
    ) {
      return 'touch-laptop';
    }

    // ---- FALLBACK TOUCH DEVICES (rare cases like touchscreen monitor) ----
    if (touchPoints > 0) {
      return 'touch-laptop';
    }

    // ---- DEFAULT ----
    return 'desktop';
  }

  /** Convenience accessors */
  isTouch = navigator.maxTouchPoints > 0;
  isDesktop = this.device() === 'desktop';
  isMobile = this.device() === 'mobile';
  isTablet = this.device() === 'tablet';
  isTouchLaptop = this.device() === 'touch-laptop';
}
