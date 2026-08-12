import { type RefObject } from "preact";
import { useEffect, useState } from "preact/hooks";

import { rotateInputVector45 } from "../game/input/analogueControlAdjustments";
import {
  type DirectionXy8,
  vectorClosestDirectionXy8,
} from "../utils/vectors/vectors";

const directionTowardsPointer = (
  element: HTMLElement,
  pointerX: number,
  pointerY: number,
): DirectionXy8 | undefined => {
  const { left, top, width, height } = element.getBoundingClientRect();

  const screenDelta = {
    x: left + width / 2 - pointerX,
    y: top + height / 2 - pointerY,
    z: 0,
  };

  // sprites face in game space, so rotate the screen-space vector into it
  return vectorClosestDirectionXy8(rotateInputVector45(screenDelta));
};

/**
 * the 8-way direction a sprite centred in the given element should face for it
 * to look towards the mouse pointer, reverting to defaultFacing while the
 * pointer is outside the window
 */
export const useFacingTowardsPointer = (
  elementRef: RefObject<HTMLElement | null>,
  defaultFacing: DirectionXy8,
): DirectionXy8 => {
  const [facing, setFacing] = useState<DirectionXy8>(defaultFacing);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const element = elementRef.current;
      if (element === null) {
        return;
      }
      setFacing(
        directionTowardsPointer(element, e.clientX, e.clientY) ?? defaultFacing,
      );
    };

    const handleMouseLeave = () => {
      setFacing(defaultFacing);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [defaultFacing, elementRef]);

  return facing;
};
