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
  threshold = input(40); // Minimum px movement to consider a swipe
  longPressDelay = input(500); // ms for long press
  doubleTapDelay = input(300); // ms between taps
  moveTolerance = input(10); // px allowed movement for tap/long press
  preventDefault = input(true); // preventDefault on pointer events

  // ---------------- Outputs ----------------
  tap = output<void>();
  doubleTap = output<void>();
  longPress = output<void>();
  gesturePress = output<void>();
  release = output<void>();
  swipeLeft = output<number>();
  swipeRight = output<number>();
  swipeUp = output<number>();
  swipeDown = output<number>();
  move = output<{ dx: number; dy: number }>();
  gestureEnd = output<void>();

  // ---------------- Signals ----------------
  private pointerDownSignal = signal<PointerEvent | null>(null);
  private pointerMoveSignal = signal<PointerEvent | null>(null);
  private pointerUpSignal = signal<PointerEvent | null>(null);
  private moveDataSignal = signal<{ dx: number; dy: number } | null>(null);
  private lastTapSignal = signal<number>(0); // timestamp of last tap

  // ---------------- State ----------------
  private startX = 0;
  private startY = 0;
  private startTime = 0;
  private pressed = false;
  private moved = false;
  private gestureDetected = false;
  private activePointerId: number | null = null;
  private gestureEndTimeout: any = null;
  private longPressTimeout: any = null;

  // ---------------- Non-passive listeners ----------------
  private pointerDownListener!: (ev: PointerEvent) => void;
  private pointerMoveListener!: (ev: PointerEvent) => void;
  private pointerUpListener!: (ev: PointerEvent) => void;
  private pointerCancelListener!: (ev: PointerEvent) => void;
  private docPointerUpListener!: (ev: PointerEvent) => void;
  private lostCaptureListener!: (ev: PointerEvent) => void;

  constructor(private el: ElementRef<HTMLElement>) {
    const element = this.el.nativeElement;

    // ---------------- Attach non-passive listeners ----------------
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

    // Handle pointer down
    effect(() => {
      const ev = this.pointerDownSignal();
      if (!ev) return;

      // Ignore if another pointer is active (multi-touch/mouse button safety)
      if (this.activePointerId !== null) return;

      this.activePointerId = ev.pointerId;
      this.startX = ev.clientX;
      this.startY = ev.clientY;
      this.startTime = performance.now();
      this.pressed = true;
      this.moved = false;
      this.gestureDetected = false;

      try {
        (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
      } catch {}

      this.gesturePress.emit();

      // Long press detection
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = setTimeout(() => {
        if (this.pressed && !this.moved) {
          this.gestureDetected = true;
          this.longPress.emit();
        }
      }, this.longPressDelay());
    });

    // Handle pointer move + swipe detection
    effect(() => {
      const ev = this.pointerMoveSignal();
      if (!ev || !this.pressed || ev.pointerId !== this.activePointerId) return;

      if (this.preventDefault()) ev.preventDefault();

      const dx = ev.clientX - this.startX;
      const dy = ev.clientY - this.startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const distance = Math.hypot(dx, dy);

      // Mark moved if movement exceeds tolerance
      if (!this.moved && distance > this.moveTolerance()) {
        this.moved = true;
        clearTimeout(this.longPressTimeout);
      }

      // Swipe detection
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

      // Move streaming
      this.moveDataSignal.set({ dx, dy });
    });

    // Emit move + gestureEnd debounce
    effect(() => {
      const mv = this.moveDataSignal();
      if (!mv) return;

      this.move.emit(mv);

      clearTimeout(this.gestureEndTimeout);
      this.gestureEndTimeout = setTimeout(() => {
        if (this.pressed) this.gestureEnd.emit();
      }, 120);
    });

    // Handle pointer up: tap/double tap
    effect(() => {
      const ev = this.pointerUpSignal();
      if (!ev) return;

      // Only handle if pointer is active or fallback
      if (
        this.activePointerId !== null &&
        ev.pointerId !== this.activePointerId
      )
        return;

      const dx = ev.clientX - this.startX;
      const dy = ev.clientY - this.startY;
      const distance = Math.hypot(dx, dy);
      const duration = performance.now() - this.startTime;

      this.pressed = false;
      this.activePointerId = null;
      clearTimeout(this.longPressTimeout);

      // TAP / DOUBLE TAP
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

      // Prevent native click if gesture or movement
      if (this.gestureDetected || distance > this.moveTolerance())
        ev.preventDefault();
    });
  }

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

  // Cleanup internal state
  private cleanup() {
    this.pressed = false;
    this.moved = false;
    this.gestureDetected = false;
    this.activePointerId = null;

    clearTimeout(this.longPressTimeout);
    clearTimeout(this.gestureEndTimeout);
  }
}
