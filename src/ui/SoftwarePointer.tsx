import { createPortal } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { CssVariables } from "../game/components/CssVariables";
import { type TextureTailwindClass } from "../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useTotalUpscale } from "../store/slices/upscale/upscaleSelectors";
import { type Xy } from "../utils/vectors/vectors";

/** the pointer redraws at most this often - a retro, slightly steppy pointer */
const pointerFps = 24;
const pointerIntervalMs = 1_000 / pointerFps;

/**
 * hidden this long after the mouse stops moving - same time as the hud's
 * pointer-summoned buttons use, so the pointer and buttons appear and
 * disappear together
 */
const hideAfterIdleMs = 2_000;

/**
 * Draws the mouse pointer as a sprite instead of using the operating system's
 * cursor, so it is as blocky and low-resolution as everything else on screen.
 * The os cursor is hidden in css (see `index.css`).
 *
 * The sprite sits on whole scaled pixels and moves at {@link pointerFps}, so it
 * steps across the screen on the same grid, and at a similar rate, as the
 * game's own sprites rather than gliding like a modern cursor.
 *
 * The sprite's tip is at its top-left, so no hotspot offset is needed.
 *
 * Portalled to the body above every dialog, so nothing can cover it. Drawn for
 * mouse input only - touch has no pointer to draw.
 */
export const SoftwarePointer = (_emptyProps: EmptyObject) => {
  const [position, setPosition] = useState<null | Xy>(null);
  // how many screen pixels one game pixel occupies - also the grid the pointer
  // snaps to, so it lands only on whole game pixels
  const upscale = useTotalUpscale();

  useEffect(() => {
    let lastApplied: null | Xy = null;
    let lastAppliedAtMs = -Infinity;
    let pending: null | Xy = null;
    let trailingTimeout: number | undefined;
    let hideTimeout: number | undefined;

    const hide = () => {
      window.clearTimeout(hideTimeout);
      lastApplied = null;
      pending = null;
      setPosition(null);
    };

    const restartHideTimeout = () => {
      window.clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(hide, hideAfterIdleMs);
    };

    const apply = (snapped: Xy) => {
      if (
        lastApplied !== null &&
        lastApplied.x === snapped.x &&
        lastApplied.y === snapped.y
      ) {
        return;
      }
      lastApplied = snapped;
      lastAppliedAtMs = performance.now();
      setPosition(snapped);
    };

    const snap = (n: number) => Math.round(n / upscale) * upscale;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        hide();
        return;
      }
      restartHideTimeout();
      const snapped: Xy = { x: snap(e.clientX), y: snap(e.clientY) };
      const sinceLastMs = performance.now() - lastAppliedAtMs;
      if (sinceLastMs >= pointerIntervalMs) {
        apply(snapped);
      } else {
        // too soon - keep the latest position and apply it when the interval
        // is up, so the pointer always settles where the mouse stopped
        pending = snapped;
        trailingTimeout ??= window.setTimeout(() => {
          trailingTimeout = undefined;
          if (pending !== null) {
            apply(pending);
            pending = null;
          }
        }, pointerIntervalMs - sinceLastMs);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    // once the mouse is outside the window the os cursor takes over, so the
    // sprite would otherwise be left stranded at the edge it left by.
    // pointerleave does not bubble, so it is listened for on the root element
    // rather than the document. Leaving via another window (eg alt-tab) does
    // not always send it, hence blur too
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.clearTimeout(trailingTimeout);
      window.clearTimeout(hideTimeout);
    };
  }, [upscale]);

  if (position === null) {
    return null;
  }

  return createPortal(
    <CssVariables>
      <span
        class={`sprite ${"texture-pointer" satisfies TextureTailwindClass} fixed top-0 left-0 pointer-events-none z-softwarePointer`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </CssVariables>,
    document.body,
  );
};
