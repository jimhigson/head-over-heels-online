import { useEffect, useRef, useState } from "react";

import type { IndividualCharacterName } from "../../../../../../model/modelTypes";

import {
  type DirectionXy8,
  vectorClosestDirectionXy8,
} from "../../../../../../utils/vectors/vectors";
import { rotateInputVector45 } from "../../../../../input/analogueControlAdjustments";
import { playableTailwindSpriteClassname } from "../../../../tailwindSprites/PlayableTailwindSprite";

const getDirectionFromMousePosition = (
  element: HTMLElement,
  mouseX: number,
  mouseY: number,
): DirectionXy8 | undefined => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = centerX - mouseX;
  const dy = centerY - mouseY;

  // Screen space vector from sprite to mouse
  const screenDelta = { x: dx, y: dy, z: 0 };

  // Rotate from screen space to isometric game space
  const isometricDelta = rotateInputVector45(screenDelta);

  // Get the direction in game space
  const direction = vectorClosestDirectionXy8(isometricDelta);

  return direction;
};

export const CharacterSprite = ({
  character,
  defaultFacing,
  className = "",
}: {
  character: IndividualCharacterName;
  defaultFacing: DirectionXy8;
  className?: string;
}) => {
  const [facing, setFacing] = useState<DirectionXy8>(defaultFacing);
  const [isHovered, setIsHovered] = useState(false);

  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update facing direction
      if (spriteRef.current) {
        setFacing(
          getDirectionFromMousePosition(
            spriteRef.current,
            e.clientX,
            e.clientY,
          ) || "right",
        );
      }
    };

    const handleMouseLeave = () => {
      // Reset to original position
      setFacing(defaultFacing);
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [defaultFacing, character]);

  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveSprite = () => {
    setIsHovered(false);
  };

  // Calculate action based on hover state
  const action: "idle" | "walking" = isHovered ? "walking" : "idle";

  const spriteClassName = playableTailwindSpriteClassname({
    character,
    facingXy8: facing,
    action,
  });

  return (
    <div
      ref={spriteRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveSprite}
    >
      <span
        className={`sprite zx:sprite-revert-to-white ${spriteClassName} relative z-topSprite`}
      />
      <span className="sprite zx:hidden texture-shadow_smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
    </div>
  );
};
