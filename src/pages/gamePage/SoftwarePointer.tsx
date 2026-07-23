import { useEffect, useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppSelector } from "../../store/hooks";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";
import { type Xy } from "../../utils/vectors/vectors";

/**
 * A software-rendered mouse pointer for when the dialogs are mirrored into
 * the canvas for the crt filter. Rendered inside the mirrored subtree, it is
 * warped by the crt shaders along with the dialogs - so the pointer always
 * appears exactly over what a click would hit, making the (unwarped,
 * layout-space) hit-testing pixel-accurate to the eye by construction.
 *
 * The sprite's tip is at its top-left, so no hotspot offset is needed.
 *
 * Only shown for mouse input; touch input has no pointer to draw.
 */
export const SoftwarePointer = (_emptyProps: EmptyObject) => {
  const [position, setPosition] = useState<null | Xy>(null);
  const { cssUpscale } = useAppSelector(selectUpscale);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        setPosition(null);
        return;
      }
      // viewport px -> the mirrored subtree's layout space (the canvas'
      // pre-css-upscale box, positioned at the viewport origin)
      setPosition({ x: e.clientX / cssUpscale, y: e.clientY / cssUpscale });
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [cssUpscale]);

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
