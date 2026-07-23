import { useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppSelector } from "../../store/hooks";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { type Xy } from "../../utils/vectors/vectors";

/** the pointer redraws at most this often - a retro, slightly steppy pointer */
const pointerFps = 24;
const pointerIntervalMs = 1_000 / pointerFps;

/**
 * A software-rendered mouse pointer for when the dialogs are mirrored into
 * the canvas for the crt filter. Rendered inside the mirrored subtree, it is
 * warped by the crt shaders along with the dialogs - so the pointer always
 * appears exactly over what a click would hit, making the (unwarped,
 * layout-space) hit-testing pixel-accurate to the eye by construction.
 *
 * The pointer is snapped to the nearest scaled (game) pixel and updates at
 * most at {@link pointerFps}, both for the retro feel and to limit how often
 * pointer movement forces the mirrored subtree to repaint.
 *
 * The sprite's tip is at its top-left, so no hotspot offset is needed.
 *
 * Only shown for mouse input; touch input has no pointer to draw.
 */
export const SoftwarePointer = (_emptyProps: EmptyObject) => {
  const [position, setPosition] = useState<null | Xy>(null);
  const { cssUpscale, gameEngineUpscale } = useAppSelector(selectUpscale);

  useEffect(() => {
    let lastApplied: null | Xy = null;
    let lastAppliedAtMs = -Infinity;
    let pending: null | Xy = null;
    let trailingTimeout: number | undefined;

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

    const snap = (n: number) =>
      Math.round(n / gameEngineUpscale) * gameEngineUpscale;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        setPosition(null);
        return;
      }
      // viewport px -> the mirrored subtree's layout space (the canvas'
      // pre-css-upscale box, positioned at the viewport origin), snapped to
      // whole scaled pixels
      const snapped: Xy = {
        x: snap(e.clientX / cssUpscale),
        y: snap(e.clientY / cssUpscale),
      };
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
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.clearTimeout(trailingTimeout);
    };
  }, [cssUpscale, gameEngineUpscale]);

  if (position === null) {
    return null;
  }

  return (
    <span
      class={`sprite ${"texture-pointer" satisfies TextureTailwindClass} absolute top-0 left-0 pointer-events-none z-popups`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};
