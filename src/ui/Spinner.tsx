import { useRef } from "preact/hooks";

import { usePlayableTailwindSpriteClassname } from "../game/components/tailwindSprites/playableTailwindSpriteClassname";
import { type IndividualCharacterName } from "../model/modelTypes";
import { type DirectionXy8 } from "../utils/vectors/vectors";
import { useFacingTowardsPointer } from "./useFacingTowardsPointer";

type LoaderProps = {
  loadingBorder?: boolean;
};

type WalkingSpinnerProps = LoaderProps & {
  character: IndividualCharacterName;
  /** faced while the pointer is outside the window */
  defaultFacing: DirectionXy8;
};

const WalkingSpinner = ({
  character,
  defaultFacing,
  loadingBorder,
}: WalkingSpinnerProps) => {
  const spriteRef = useRef<HTMLDivElement>(null);
  const spriteClassname = usePlayableTailwindSpriteClassname();

  return (
    <div
      ref={spriteRef}
      class={`flex h-full items-center justify-center ${loadingBorder ? "loading-border zx:zx-loading-border toppy:toppy-loading-border" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <span
        class={`sprite ${spriteClassname({
          character,
          facingXy8: useFacingTowardsPointer(spriteRef, defaultFacing),
          action: "walking",
        })} zx:sprite-revert-zxYellow`}
        aria-hidden
      />
    </div>
  );
};

export const SpinnerHead = ({ loadingBorder }: LoaderProps = {}) => (
  <WalkingSpinner
    character="head"
    defaultFacing="right"
    loadingBorder={loadingBorder}
  />
);

export const SpinnerHeels = ({ loadingBorder }: LoaderProps = {}) => (
  <WalkingSpinner
    character="heels"
    defaultFacing="towards"
    loadingBorder={loadingBorder}
  />
);
