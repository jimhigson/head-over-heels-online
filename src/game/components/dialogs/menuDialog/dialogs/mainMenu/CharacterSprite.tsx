import { useRef, useState } from "preact/hooks";

import { type IndividualCharacterName } from "../../../../../../model/modelTypes";
import { type TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useFacingTowardsPointer } from "../../../../../../ui/useFacingTowardsPointer";
import { PlayAudio } from "../../../../../../utils/sound/PlayAudio";
import { type DirectionXy8 } from "../../../../../../utils/vectors/vectors";
import { usePlayableTailwindSpriteClassname } from "../../../../tailwindSprites/playableTailwindSpriteClassname";

const walkGain = 0.8;

export type CharacterSpriteProps = {
  character: IndividualCharacterName;
  defaultFacing: DirectionXy8;
  class?: string;
};

export const CharacterSprite = ({
  character,
  defaultFacing,
  class: className = "",
}: CharacterSpriteProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const spriteClassname = usePlayableTailwindSpriteClassname();

  const spriteRef = useRef<HTMLDivElement>(null);
  const facing = useFacingTowardsPointer(spriteRef, defaultFacing);

  const action: "idle" | "walking" = isHovered ? "walking" : "idle";

  const spriteClassName = spriteClassname({
    character,
    facingXy8: facing,
    action,
  });

  return (
    <div
      ref={spriteRef}
      class={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {action === "walking" && (
        <PlayAudio soundId={`${character}Walk`} loop volume={walkGain} />
      )}
      <span
        class={`sprite zx:sprite-revert-to-white ${spriteClassName} relative z-topSprite`}
      />
      <span
        class={`sprite zx:hidden ${"texture-shadow_playable" satisfies TextureTailwindClass} sprite-shadow absolute left-0 opacity-halfBrite`}
      />
    </div>
  );
};
