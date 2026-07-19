import { type IndividualCharacterName } from "../../../model/modelTypes";
import { spritesheetMetas } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { type LoadableSpriteOption } from "../../../sprites/spritesheet/Spritesheets";
import { useAppSelector } from "../../../store/hooks";
import { selectSpritesOption } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { twClass } from "../../../utils/twClass" with { type: "macro" };
import { type DirectionXy8 } from "../../../utils/vectors/vectors";

const idleHeadClass = (
  facingXy8: DirectionXy8,
  spritesheetName: LoadableSpriteOption,
): AnimatedTextureTailwindClass | TextureTailwindClass => {
  const directionFrames =
    spritesheetMetas[spritesheetName].playable.head[facingXy8];
  const hasIdleAnimation =
    directionFrames?.blinking && directionFrames?.standing;

  if (hasIdleAnimation) {
    switch (facingXy8) {
      case "away":
        return twClass("texture-animated-head_idle_d2");
      case "towards":
        return twClass("texture-animated-head_idle_d6");
      case "left":
        return twClass("texture-animated-head_idle_d0");
      case "right":
        return twClass("texture-animated-head_idle_d4");
      case "awayRight":
        return twClass("texture-animated-head_idle_d3");
      case "towardsRight":
        return twClass("texture-animated-head_idle_d5");
      case "towardsLeft":
        return twClass("texture-animated-head_idle_d7");
      case "awayLeft":
        return twClass("texture-animated-head_idle_d1");
      default:
        facingXy8 satisfies never;
        throw new Error(`Invalid facingXy8: ${facingXy8}`);
    }
  }

  const { standing } = directionFrames ?? {};
  if (standing === true) {
    switch (facingXy8) {
      case "away":
        return twClass("texture-head_standing_d2");
      case "towards":
        return twClass("texture-head_standing_d6");
      case "left":
        return twClass("texture-head_standing_d0");
      case "right":
        return twClass("texture-head_standing_d4");
      case "awayRight":
        return twClass("texture-head_standing_d3");
      case "towardsRight":
        return twClass("texture-head_standing_d5");
      case "towardsLeft":
        return twClass("texture-head_standing_d7");
      case "awayLeft":
        return twClass("texture-head_standing_d1");
      default:
        facingXy8 satisfies never;
        throw new Error(`Invalid facingXy8: ${facingXy8}`);
    }
  }

  const walkFrame = standing ?? 2;
  switch (facingXy8) {
    case "away":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_d2_1")
        : walkFrame === 3 ? twClass("texture-head_walking_d2_3")
        : twClass("texture-head_walking_d2_2")
      );
    case "towards":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_d6_1")
        : walkFrame === 3 ? twClass("texture-head_walking_d6_3")
        : twClass("texture-head_walking_d6_2")
      );
    case "left":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_d0_1")
        : walkFrame === 3 ? twClass("texture-head_walking_d0_3")
        : twClass("texture-head_walking_d0_2")
      );
    case "right":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_d4_1")
        : walkFrame === 3 ? twClass("texture-head_walking_d4_3")
        : twClass("texture-head_walking_d4_2")
      );
    case "awayRight":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_d3_1")
        : walkFrame === 3 ? twClass("texture-head_walking_d3_3")
        : twClass("texture-head_walking_d3_2")
      );
    case "towardsRight":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_d5_1")
        : walkFrame === 3 ? twClass("texture-head_walking_d5_3")
        : twClass("texture-head_walking_d5_2")
      );
    case "towardsLeft":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_d7_1")
        : walkFrame === 3 ? twClass("texture-head_walking_d7_3")
        : twClass("texture-head_walking_d7_2")
      );
    case "awayLeft":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_d1_1")
        : walkFrame === 3 ? twClass("texture-head_walking_d1_3")
        : twClass("texture-head_walking_d1_2")
      );
    default:
      facingXy8 satisfies never;
      throw new Error(`Invalid facingXy8: ${facingXy8}`);
  }
};

const idleHeelsClass = (
  facingXy8: DirectionXy8,
  spritesheetName: LoadableSpriteOption,
): AnimatedTextureTailwindClass | TextureTailwindClass => {
  const directionFrames =
    spritesheetMetas[spritesheetName].playable.heels[facingXy8];
  const hasIdleAnimation =
    directionFrames?.blinking && directionFrames?.standing;

  if (hasIdleAnimation) {
    switch (facingXy8) {
      case "away":
        return twClass("texture-animated-heels_idle_d2");
      case "towards":
        return twClass("texture-animated-heels_idle_d6");
      case "left":
        return twClass("texture-animated-heels_idle_d0");
      case "right":
        return twClass("texture-animated-heels_idle_d4");
      case "awayRight":
        return twClass("texture-animated-heels_idle_d3");
      case "towardsRight":
        return twClass("texture-animated-heels_idle_d5");
      case "towardsLeft":
        return twClass("texture-animated-heels_idle_d7");
      case "awayLeft":
        return twClass("texture-animated-heels_idle_d1");
      default:
        facingXy8 satisfies never;
        throw new Error(`Invalid facingXy8: ${facingXy8}`);
    }
  }

  const { standing } = directionFrames ?? {};
  if (standing === true) {
    switch (facingXy8) {
      case "away":
        return twClass("texture-heels_standing_d2");
      case "towards":
        return twClass("texture-heels_standing_d6");
      case "left":
        return twClass("texture-heels_standing_d0");
      case "right":
        return twClass("texture-heels_standing_d4");
      case "awayRight":
        return twClass("texture-heels_standing_d3");
      case "towardsRight":
        return twClass("texture-heels_standing_d5");
      case "towardsLeft":
        return twClass("texture-heels_standing_d7");
      case "awayLeft":
        return twClass("texture-heels_standing_d1");
      default:
        facingXy8 satisfies never;
        throw new Error(`Invalid facingXy8: ${facingXy8}`);
    }
  }

  const walkFrame = standing ?? 2;
  switch (facingXy8) {
    case "away":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_d2_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_d2_3")
        : twClass("texture-heels_walking_d2_2")
      );
    case "towards":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_d6_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_d6_3")
        : twClass("texture-heels_walking_d6_2")
      );
    case "left":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_d0_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_d0_3")
        : twClass("texture-heels_walking_d0_2")
      );
    case "right":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_d4_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_d4_3")
        : twClass("texture-heels_walking_d4_2")
      );
    case "awayRight":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_d3_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_d3_3")
        : twClass("texture-heels_walking_d3_2")
      );
    case "towardsRight":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_d5_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_d5_3")
        : twClass("texture-heels_walking_d5_2")
      );
    case "towardsLeft":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_d7_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_d7_3")
        : twClass("texture-heels_walking_d7_2")
      );
    case "awayLeft":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_d1_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_d1_3")
        : twClass("texture-heels_walking_d1_2")
      );
    default:
      facingXy8 satisfies never;
      throw new Error(`Invalid facingXy8: ${facingXy8}`);
  }
};

export const playableTailwindSpriteClassname = ({
  facingXy8,
  character,
  action,
  spritesheetName,
}: {
  character: IndividualCharacterName;
  facingXy8: DirectionXy8;
  action: "idle" | "walking";
  spritesheetName: LoadableSpriteOption;
}): AnimatedTextureTailwindClass | TextureTailwindClass => {
  switch (character) {
    case "head": {
      switch (action) {
        case "walking": {
          switch (facingXy8) {
            case "away":
              return twClass("texture-animated-head_walking_d2");
            case "towards":
              return twClass("texture-animated-head_walking_d6");
            case "left":
              return twClass("texture-animated-head_walking_d0");
            case "right":
              return twClass("texture-animated-head_walking_d4");
            case "awayRight":
              return twClass("texture-animated-head_walking_d3");
            case "towardsRight":
              return twClass("texture-animated-head_walking_d5");
            case "towardsLeft":
              return twClass("texture-animated-head_walking_d7");
            case "awayLeft":
              return twClass("texture-animated-head_walking_d1");
            default:
              facingXy8 satisfies never;
              throw new Error(`Invalid facingXy8: ${facingXy8}`);
          }
        }
        case "idle":
          return idleHeadClass(facingXy8, spritesheetName);
      }
      break;
    }
    case "heels": {
      switch (action) {
        case "walking": {
          switch (facingXy8) {
            case "away":
              return twClass("texture-animated-heels_walking_d2");
            case "towards":
              return twClass("texture-animated-heels_walking_d6");
            case "left":
              return twClass("texture-animated-heels_walking_d0");
            case "right":
              return twClass("texture-animated-heels_walking_d4");
            case "awayRight":
              return twClass("texture-animated-heels_walking_d3");
            case "towardsRight":
              return twClass("texture-animated-heels_walking_d5");
            case "towardsLeft":
              return twClass("texture-animated-heels_walking_d7");
            case "awayLeft":
              return twClass("texture-animated-heels_walking_d1");
            default:
              facingXy8 satisfies never;
              throw new Error(`Invalid facingXy8: ${facingXy8}`);
          }
        }
        case "idle":
          return idleHeelsClass(facingXy8, spritesheetName);
      }
      break;
    }
  }
};

export const usePlayableTailwindSpriteClassname = () => {
  const spriteOption = useAppSelector(selectSpritesOption);

  return (args: {
    character: IndividualCharacterName;
    facingXy8: DirectionXy8;
    action: "idle" | "walking";
  }) =>
    playableTailwindSpriteClassname({
      ...args,
      spritesheetName: spriteOption.name,
    });
};
