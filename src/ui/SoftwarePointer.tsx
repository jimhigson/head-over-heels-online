import { createPortal } from "preact/compat";
import { useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { CssVariables } from "../game/components/CssVariables";
import {
  pointerActivityEvents,
  usePointerActive,
} from "../game/input/usePointerActive";
import { type TextureTailwindClass } from "../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useTotalUpscale } from "../store/slices/upscale/upscaleSelectors";

/** the pointer redraws at most this often - a retro, slightly steppy pointer */
const pointerFps = 24;
const pointerIntervalMs = 1_000 / pointerFps;

/** to the nearest whole game pixel, so the sprite lands on the pixel grid */
const snapToUpscale = (n: number, upscale: number) =>
  Math.round(n / upscale) * upscale;

const applyTransform = (sprite: HTMLSpanElement, x: number, y: number) => {
  sprite.style.transform = `translate(${x}px, ${y}px)`;
};

/** an empty inline display reverts to whatever the sprite's stylesheet says */
const setSpriteShown = (sprite: HTMLSpanElement, shown: boolean) => {
  sprite.style.display = shown ? "" : "none";
};

/**
 * Draws the mouse pointer as a sprite instead of using the operating system's
 * cursor, so it is pixel-art and low FPS
 */
export const SoftwarePointer = (_emptyProps: EmptyObject) => {
  // the sprite stays mounted for the life of the component and is moved, shown
  // and hidden by direct dom writes, so no render happens as the mouse moves.
  // `style` is deliberately not a jsx prop, so a re-render cannot clobber those
  // writes
  const spriteRef = useRef<HTMLSpanElement | null>(null);

  // how many screen pixels one game pixel occupies - also the grid the pointer
  // snaps to, so it lands only on whole game pixels
  const upscale = useTotalUpscale();

  // read inside the move listener rather than closed over, so the listener
  // never has to be rebuilt mid-movement and can never apply a stale scale
  const upscaleRef = useRef(upscale);
  upscaleRef.current = upscale;

  // starts hidden - before the browser paints, so it is never seen unpositioned
  useLayoutEffect(() => {
    const sprite = spriteRef.current;
    if (sprite !== null) {
      setSpriteShown(sprite, false);
    }
  }, []);

  const pointerActive = usePointerActive();

  // tracks and draws the mouse only while it is in use - the sampling loop and
  // the listener that feeds it exist for exactly that period
  useEffect(() => {
    // captured once: the span is rendered unconditionally, so it is the same
    // element for the whole life of the component
    const sprite = spriteRef.current;
    if (!pointerActive || sprite === null) {
      return;
    }

    // where the mouse has reached, held as scalars so a move costs no
    // allocation. The sampling loop, not the move listener, writes it to the dom
    let latestX = 0;
    let latestY = 0;
    // guards against showing the sprite before the mouse has been anywhere -
    // the move that made the pointer active was dispatched before this effect
    // ran, so is not seen here
    let moved = false;
    // NaN so that the first sample always counts as a change
    let appliedX = NaN;
    let appliedY = NaN;
    let appliedAtMs = -Infinity;
    let frame = 0;

    // samples the latest position at pointerFps rather than following every
    // move, so the pointer steps across the screen like the game's own sprites
    const sample = (nowMs: number) => {
      frame = requestAnimationFrame(sample);

      if (!moved || nowMs - appliedAtMs < pointerIntervalMs) {
        return;
      }
      if (appliedX === latestX && appliedY === latestY) {
        return;
      }
      appliedAtMs = nowMs;
      appliedX = latestX;
      appliedY = latestY;
      // positioned before being shown, so it cannot appear at a stale position
      applyTransform(sprite, latestX, latestY);
      setSpriteShown(sprite, true);
    };

    const handlePointerActivity = (e: PointerEvent) => {
      const { current: upscale } = upscaleRef;
      latestX = snapToUpscale(e.clientX, upscale);
      latestY = snapToUpscale(e.clientY, upscale);
      moved = true;
    };

    for (const eventName of pointerActivityEvents) {
      window.addEventListener(eventName, handlePointerActivity, {
        passive: true,
      });
    }
    frame = requestAnimationFrame(sample);

    return () => {
      for (const eventName of pointerActivityEvents) {
        window.removeEventListener(eventName, handlePointerActivity);
      }
      cancelAnimationFrame(frame);
      setSpriteShown(sprite, false);
    };
  }, [pointerActive]);

  return createPortal(
    <CssVariables>
      <span
        ref={spriteRef}
        class={`sprite zx:sprite-revert-to-two-tone-dim ${"texture-pointer" satisfies TextureTailwindClass} fixed top-0 left-0 pointer-events-none z-softwarePointer`}
      />
    </CssVariables>,
    document.body,
  );
};
