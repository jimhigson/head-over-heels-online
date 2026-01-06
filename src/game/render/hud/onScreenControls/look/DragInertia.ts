import type { Xy } from "../../../../../utils/vectors/vectors";

/**
 * Constant deceleration rate in pixels/ms²
 * Calibrated to match previous exponential decay of 0.92/frame at 60fps
 * This gives similar stopping time and feel
 */
const inertiaDeceleration = 0.0006;

/** Velocity below this threshold is considered stopped (pixels/ms) */
const inertiaMinVelocity = 0.0001;

/** How much to blend new velocity measurements with existing velocity (0-1) */
const velocitySmoothingFactor = 0.3;

/** Time in milliseconds of no movement before velocity is reset */
const velocityResetTimeMs = 40;

/**
 * Handles drag inertia physics - tracking velocity during drag and applying
 * inertial movement after release
 */
export class DragInertia {
  /** Current velocity in pixels/ms */
  #velocity: Xy = { x: 0, y: 0 };

  /** Timestamp of last movement for velocity calculation */
  #lastMovementTime: number = 0;

  /** Whether we're currently dragging */
  #isDragging: boolean = false;

  /**
   * Start a new drag operation
   */
  startDrag() {
    this.#isDragging = true;
    this.#velocity = { x: 0, y: 0 };
    this.#lastMovementTime = performance.now();
  }

  /**
   * Stop the current drag operation
   */
  stopDrag() {
    this.#isDragging = false;
    // Keep velocity for inertia
  }

  /**
   * Update velocity based on movement
   * @param delta Movement delta in pixels
   */
  updateVelocity(delta: Xy) {
    const now = performance.now();
    const dt = now - this.#lastMovementTime;

    if (dt > 0) {
      // Calculate instantaneous velocity in pixels/ms
      const vx = delta.x / dt;
      const vy = delta.y / dt;

      // Smooth the velocity to avoid jitter
      this.#velocity.x =
        this.#velocity.x * (1 - velocitySmoothingFactor) +
        vx * velocitySmoothingFactor;
      this.#velocity.y =
        this.#velocity.y * (1 - velocitySmoothingFactor) +
        vy * velocitySmoothingFactor;
    }

    this.#lastMovementTime = now;
  }

  /**
   * Check if dragging but stationary, and reset velocity if needed
   */
  checkStationaryDrag() {
    if (this.#isDragging) {
      const timeSinceLastMove = performance.now() - this.#lastMovementTime;
      if (timeSinceLastMove > velocityResetTimeMs) {
        this.#velocity = { x: 0, y: 0 };
      }
    }
  }

  /**
   * Apply inertia and return the movement to apply this frame
   * @param deltaMS Time since last frame in milliseconds
   * @returns Movement to apply this frame
   */
  applyInertia(deltaMS: number): Xy {
    const movement: Xy = { x: 0, y: 0 };

    if (!this.#isDragging) {
      // Calculate current speed
      const speed = Math.sqrt(
        this.#velocity.x * this.#velocity.x +
          this.#velocity.y * this.#velocity.y,
      );

      // Only apply if velocity is significant
      if (speed > inertiaMinVelocity) {
        // Calculate movement for this frame
        movement.x = this.#velocity.x * deltaMS;
        movement.y = this.#velocity.y * deltaMS;

        // Apply constant deceleration
        const decelerationMagnitude = inertiaDeceleration * deltaMS;
        const newSpeed = Math.max(0, speed - decelerationMagnitude);

        // Scale velocity to new speed (maintains direction)
        if (newSpeed > 0) {
          const scale = newSpeed / speed;
          this.#velocity.x *= scale;
          this.#velocity.y *= scale;
        } else {
          // Stopped completely
          this.#velocity.x = 0;
          this.#velocity.y = 0;
        }
      } else {
        // Below threshold, stop completely
        this.#velocity.x = 0;
        this.#velocity.y = 0;
      }
    }

    return movement;
  }

  /**
   * Reset all state
   */
  reset() {
    this.#velocity = { x: 0, y: 0 };
    this.#isDragging = false;
    this.#lastMovementTime = 0;
  }

  get isDragging() {
    return this.#isDragging;
  }
}
