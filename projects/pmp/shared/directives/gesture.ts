import {
  Directive,
  HostListener,
  input,
  output,
  OnDestroy,
} from '@angular/core';

@Directive({ selector: '[gesture]' })
export class GestureDirective implements OnDestroy {
  // Configurable inputs (Signals)
  threshold = input(40); // min px for swipe
  longPressDelay = input(500); // ms for long press
  doubleTapDelay = input(300); // ms between taps
  moveTolerance = input(10); // px movement allowed for tap/longpress
  preventDefault = input(true); // preventDefault on pointerdown

  // Outputs (Signals)
  tap = output<void>();
  doubleTap = output<void>();
  longPress = output<void>();
  press = output<void>();
  release = output<void>();

  swipeLeft = output<number>(); // emits velocity
  swipeRight = output<number>();
  swipeUp = output<number>();
  swipeDown = output<number>();

  // internal state
  private startX = 0;
  private startY = 0;
  private lastX = 0;
  private lastY = 0;
  private startTime = 0;
  private lastTapTime = 0;
  private longPressTimeout: any = null;
  private pressed = false;
  private activePointerId: number | null = null;
  private moved = false;

  // --------- Helpers ----------
  private clearLongPress() {
    if (this.longPressTimeout) {
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = null;
    }
  }

  private cleanupCapture(event?: PointerEvent) {
    // release pointer capture if we have it
    if (this.activePointerId != null && event?.currentTarget) {
      const element = event.currentTarget as HTMLElement;
      try {
        element.releasePointerCapture(this.activePointerId);
      } catch {
        /* ignore */
      }
    }
    this.activePointerId = null;
    this.pressed = false;
    this.clearLongPress();
    this.moved = false;
  }

  ngOnDestroy(): void {
    this.clearLongPress();
    this.activePointerId = null;
  }

  // --------- Event handlers ----------

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    // ensure we operate on the element that has the directive
    console.log('pointerdown gesture');
    const element = event.currentTarget as HTMLElement | null;
    if (!element) return;

    if (this.preventDefault()) {
      // preventDefault helps stop the browser from stealing the gesture
      try {
        event.preventDefault();
      } catch {
        /* ignore when passive browsers object */
      }
    }

    this.activePointerId = event.pointerId;
    this.startX = this.lastX = event.clientX;
    this.startY = this.lastY = event.clientY;
    this.startTime = performance.now();
    this.pressed = true;
    this.moved = false;

    // best-effort pointer capture
    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      /* some environments throw */
    }

    this.press.emit();

    // long press detection: cancelled if moved > moveTolerance
    this.clearLongPress();
    this.longPressTimeout = setTimeout(() => {
      if (this.pressed && !this.moved) {
        this.longPress.emit();
      }
    }, this.longPressDelay());
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    if (!this.pressed || this.activePointerId !== event.pointerId) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    const abs = Math.hypot(dx, dy);

    this.lastX = event.clientX;
    this.lastY = event.clientY;

    if (!this.moved && abs > this.moveTolerance()) {
      // movement exceeded tolerance -> cancel longpress and mark moved
      this.moved = true;
      this.clearLongPress();
    }
  }

  // Normal pointerup on the element
  @HostListener('pointerup', ['$event'])
  onPointerUp(event: PointerEvent) {
    console.log('pointerup gesture');
    this.handlePointerEnd(event);
  }

  // Document-level pointerup fallback (catches ups outside the element)
  @HostListener('document:pointerup', ['$event'])
  onDocumentPointerUp(event: PointerEvent) {
    console.log('document pointerup gesture');
    // only handle if it's our active pointer
    if (this.activePointerId === event.pointerId) {
      // emulate the same end handling
      this.handlePointerEnd(event);
    }
  }

  @HostListener('pointercancel', ['$event'])
  onPointerCancel(event: PointerEvent) {
    console.log('pointercancel gesture');
    this.cleanupCapture(event);
  }

  @HostListener('lostpointercapture', ['$event'])
  onLostPointerCapture(event: PointerEvent) {
    // ensure we clean internal state
    console.log('lostpointercapture gesture');
    this.cleanupCapture(event);
  }

  private handlePointerEnd(event: PointerEvent) {
    const element = (event.currentTarget ??
      (event.target as any)) as HTMLElement | null;
    if (element && this.activePointerId != null) {
      try {
        element.releasePointerCapture(this.activePointerId);
      } catch {
        /* ignore */
      }
    }

    // guard: only process if we were pressed for this pointer
    if (this.activePointerId !== event.pointerId) {
      // not our pointer -> just cleanup defensively
      this.cleanupCapture(event);
      return;
    }

    const endTime = performance.now();
    const duration = endTime - this.startTime;
    const diffX = event.clientX - this.startX;
    const diffY = event.clientY - this.startY;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);
    const dt = Math.max(duration / 1000, 0.001); // seconds, avoid div by zero
    const velocity = Math.max(absX, absY) / dt;

    // release housekeeping
    this.clearLongPress();
    this.pressed = false;
    this.activePointerId = null;

    // swipe detection
    if (absX > this.threshold() || absY > this.threshold()) {
      if (absX > absY) {
        diffX > 0
          ? this.swipeRight.emit(velocity)
          : this.swipeLeft.emit(velocity);
      } else {
        diffY > 0 ? this.swipeDown.emit(velocity) : this.swipeUp.emit(velocity);
      }
      this.release.emit();
      return;
    }

    // tap / double tap
    if (!this.moved && duration < 500) {
      const timeSinceLastTap = endTime - this.lastTapTime;
      if (timeSinceLastTap < this.doubleTapDelay()) {
        this.doubleTap.emit();
        this.lastTapTime = 0;
      } else {
        this.tap.emit();
        this.lastTapTime = endTime;
      }
    }

    this.release.emit();
  }
}
