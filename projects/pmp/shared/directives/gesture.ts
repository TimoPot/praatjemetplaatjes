import {
  Directive,
  ElementRef,
  input,
  output,
  OnDestroy,
  signal,
  effect,
} from '@angular/core';

@Directive({ selector: '[gesture]' })
export class GestureDirective implements OnDestroy {
  // ---------------- Inputs ----------------
  threshold = input(40); // Minimum px to detect a swipe
  longPressDelay = input(500); // ms for long press
  doubleTapDelay = input(300); // ms between two taps to count as double tap
  moveTolerance = input(10); // Maximum px movement to still consider a tap/long press
  preventDefault = input(true); // Prevent default browser behavior (like scrolling)

  // ---------------- Outputs ----------------
  tap = output<void>(); // Single tap event
  doubleTap = output<void>(); // Double tap event
  longPress = output<void>(); // Long press event
  gesturePress = output<void>(); // Pointer down / gesture start
  release = output<void>(); // Pointer release / gesture end
  swipeLeft = output<number>(); // Swipe left with velocity
  swipeRight = output<number>(); // Swipe right with velocity
  swipeUp = output<number>(); // Swipe up with velocity
  swipeDown = output<number>(); // Swipe down with velocity
  move = output<{ dx: number; dy: number }>(); // Live move stream
  gestureEnd = output<void>(); // Emitted after gesture stops (debounced)

  // ---------------- Signals ----------------
  // Reactive signals to track pointer events and movement
  private pointerDownSignal = signal<PointerEvent | null>(null);
  private pointerMoveSignal = signal<PointerEvent | null>(null);
  private pointerUpSignal = signal<PointerEvent | null>(null);
  private moveDataSignal = signal<{ dx: number; dy: number } | null>(null);
  private lastTapSignal = signal<number>(0); // Timestamp of last tap for double tap detection

  // ---------------- Internal State ----------------
  private startX = 0; // X position when pointer down
  private startY = 0; // Y position when pointer down
  private startTime = 0; // Time of pointer down
  private pressed = false; // Pointer is currently pressed
  private moved = false; // Pointer has moved past moveTolerance
  private gestureDetected = false; // Swipe or long press detected
  private activePointerId: number | null = null; // Currently active pointer ID
  private gestureEndTimeout: any = null; // Timeout for debounced gestureEnd
  private longPressTimeout: any = null; // Timeout for long press detection

  // ---------------- Non-passive listener references ----------------
  private pointerDownListener!: (ev: PointerEvent) => void;
  private pointerMoveListener!: (ev: PointerEvent) => void;
  private pointerUpListener!: (ev: PointerEvent) => void;
  private pointerCancelListener!: (ev: PointerEvent) => void;
  private docPointerUpListener!: (ev: PointerEvent) => void;
  private lostCaptureListener!: (ev: PointerEvent) => void;

  constructor(private el: ElementRef<HTMLElement>) {
    const element = this.el.nativeElement;

    // ---------------- Attach non-passive event listeners ----------------
    // Non-passive ensures we can call preventDefault to stop scrolling, etc.
    this.pointerDownListener = (ev) => this.pointerDownSignal.set(ev);
    this.pointerMoveListener = (ev) => this.pointerMoveSignal.set(ev);
    this.pointerUpListener = (ev) => this.pointerUpSignal.set(ev);
    this.pointerCancelListener = () => this.cleanup();
    this.docPointerUpListener = (ev) => this.pointerUpSignal.set(ev);
    this.lostCaptureListener = () => this.cleanup();

    element.addEventListener('pointerdown', this.pointerDownListener, {
      passive: false,
    });
    element.addEventListener('pointermove', this.pointerMoveListener, {
      passive: false,
    });
    element.addEventListener('pointerup', this.pointerUpListener, {
      passive: false,
    });
    element.addEventListener('pointercancel', this.pointerCancelListener, {
      passive: false,
    });
    element.addEventListener('lostpointercapture', this.lostCaptureListener, {
      passive: false,
    });
    document.addEventListener('pointerup', this.docPointerUpListener, {
      passive: false,
    });

    // ---------------- Effects ----------------

    // ----- Pointer down effect -----
    effect(() => {
      const ev = this.pointerDownSignal();
      if (!ev) return;

      // Ignore if another pointer is already active (multi-touch/mouse safety)
      if (this.activePointerId !== null) return;

      // Initialize state for new gesture
      this.activePointerId = ev.pointerId;
      this.startX = ev.clientX;
      this.startY = ev.clientY;
      this.startTime = performance.now();
      this.pressed = true;
      this.moved = false;
      this.gestureDetected = false;

      // Try capturing pointer to continue receiving move/up events even outside element
      try {
        (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
      } catch {}

      // Emit gesturePress immediately
      this.gesturePress.emit();

      // Start long press detection timer
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = setTimeout(() => {
        if (this.pressed && !this.moved) {
          this.gestureDetected = true; // mark as a "real" gesture
          this.longPress.emit();
        }
      }, this.longPressDelay());
    });

    // ----- Pointer move effect (swipe + move streaming) -----
    effect(() => {
      const ev = this.pointerMoveSignal();
      if (!ev || !this.pressed || ev.pointerId !== this.activePointerId) return;

      if (this.preventDefault()) ev.preventDefault(); // prevent scrolling

      // Calculate cumulative movement
      const dx = ev.clientX - this.startX;
      const dy = ev.clientY - this.startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const distance = Math.hypot(dx, dy);

      // Check if movement exceeds tolerance -> mark as moved
      if (!this.moved && distance > this.moveTolerance()) {
        this.moved = true;
        clearTimeout(this.longPressTimeout); // cancel long press if moved
      }

      // Swipe detection: emit immediately if threshold exceeded
      if (
        !this.gestureDetected &&
        (absX > this.threshold() || absY > this.threshold())
      ) {
        this.gestureDetected = true;
        const dt = (performance.now() - this.startTime) / 1000;
        const velocity = Math.max(absX, absY) / Math.max(dt, 0.001);

        if (absX > absY)
          dx > 0
            ? this.swipeRight.emit(velocity)
            : this.swipeLeft.emit(velocity);
        else
          dy > 0 ? this.swipeDown.emit(velocity) : this.swipeUp.emit(velocity);

        this.release.emit();
      }

      // Emit move delta
      this.moveDataSignal.set({ dx, dy });
    });

    // ----- Move streaming + gestureEnd debounce -----
    effect(() => {
      const mv = this.moveDataSignal();
      if (!mv) return;

      this.move.emit(mv);

      // Debounce gestureEnd (fires 120ms after last movement)
      clearTimeout(this.gestureEndTimeout);
      this.gestureEndTimeout = setTimeout(() => {
        if (this.pressed) this.gestureEnd.emit();
      }, 120);
    });

    // ----- Pointer up effect (tap / double tap) -----
    effect(() => {
      const ev = this.pointerUpSignal();
      if (!ev) return;

      // Only handle if pointer is active, or fallback if no active pointer
      if (
        this.activePointerId !== null &&
        ev.pointerId !== this.activePointerId
      )
        return;

      // Calculate movement and duration
      const dx = ev.clientX - this.startX;
      const dy = ev.clientY - this.startY;
      const distance = Math.hypot(dx, dy);
      const duration = performance.now() - this.startTime;

      this.pressed = false;
      this.activePointerId = null;
      clearTimeout(this.longPressTimeout);

      // ----- TAP / DOUBLE TAP detection -----
      if (
        !this.gestureDetected &&
        distance <= this.moveTolerance() &&
        duration < 300
      ) {
        const now = performance.now();
        const delta = now - this.lastTapSignal();
        if (delta < this.doubleTapDelay()) {
          this.doubleTap.emit();
          this.lastTapSignal.set(0);
          this.gestureDetected = true;
        } else {
          this.tap.emit();
          this.lastTapSignal.set(now);
        }
      }

      this.release.emit();

      // Prevent native click if gesture detected or moved
      if (this.gestureDetected || distance > this.moveTolerance())
        ev.preventDefault();
    });
  }

  // ---------------- Cleanup on destroy ----------------
  ngOnDestroy(): void {
    const element = this.el.nativeElement;

    element.removeEventListener('pointerdown', this.pointerDownListener);
    element.removeEventListener('pointermove', this.pointerMoveListener);
    element.removeEventListener('pointerup', this.pointerUpListener);
    element.removeEventListener('pointercancel', this.pointerCancelListener);
    element.removeEventListener('lostpointercapture', this.lostCaptureListener);
    document.removeEventListener('pointerup', this.docPointerUpListener);

    clearTimeout(this.longPressTimeout);
    clearTimeout(this.gestureEndTimeout);
  }

  // ---------------- Cleanup internal state ----------------
  private cleanup() {
    this.pressed = false;
    this.moved = false;
    this.gestureDetected = false;
    this.activePointerId = null;

    clearTimeout(this.longPressTimeout);
    clearTimeout(this.gestureEndTimeout);
  }
}
