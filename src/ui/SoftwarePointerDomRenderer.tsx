import { createPortal } from "preact/compat";
import { useEffect, useLayoutEffect, useRef } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { CssVariables } from "../game/components/CssVariables";
import { usePointerTracker } from "../game/input/InputStateProvider";
import { type TextureTailwindClass } from "../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppSelector } from "../store/hooks";
import { selectIsPointerOnTube } from "../store/slices/gameMenus/gameMenusSelectors";
import { useTotalUpscale } from "../store/slices/upscale/upscaleSelectors";

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
 * Draws the mouse pointer as a dom sprite instead of using the operating
 * system's cursor, so it is pixel-art and low FPS. Steps aside while the
 * pointer is drawn on the television instead
 */
export const SoftwarePointerDomRenderer = (_emptyProps: EmptyObject) => {
  // the sprite stays mounted for the life of the component and is moved, shown
  // and hidden by direct dom writes, so no render happens as the mouse moves.
  // `style` is deliberately not a jsx prop, so a re-render cannot clobber those
  // writes
  const spriteRef = useRef<HTMLSpanElement | null>(null);

  const pointerTracker = usePointerTracker();
  // how many screen pixels one game pixel occupies - also the grid the pointer
  // snaps to, so it lands only on whole game pixels
  const upscale = useTotalUpscale();
  const pointerOnTube = useAppSelector(selectIsPointerOnTube);

  // starts hidden - before the browser paints, so it is never seen unpositioned
  useLayoutEffect(() => {
    const sprite = spriteRef.current;
    if (sprite !== null) {
      setSpriteShown(sprite, false);
    }
  }, []);

  // hide the os cursor while a software pointer is drawn in its place, on the
  // page or on the television
  useEffect(() => {
    document.body.classList.add("hide-os-cursor");
    return () => {
      document.body.classList.remove("hide-os-cursor");
    };
  }, []);

  useEffect(() => {
    // captured once: the span is rendered unconditionally, so it is the same
    // element for the whole life of the component
    const sprite = spriteRef.current;
    if (sprite === null) {
      return;
    }

    const render = () => {
      const shown = pointerTracker.shown && !pointerOnTube;
      if (shown) {
        // positioned before being shown, so it cannot appear at a stale position
        applyTransform(
          sprite,
          snapToUpscale(pointerTracker.clientX, upscale),
          snapToUpscale(pointerTracker.clientY, upscale),
        );
      }
      setSpriteShown(sprite, shown);
    };

    render();
    pointerTracker.events.on("change", render);
    return () => {
      pointerTracker.events.off("change", render);
      setSpriteShown(sprite, false);
    };
  }, [pointerTracker, pointerOnTube, upscale]);

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
