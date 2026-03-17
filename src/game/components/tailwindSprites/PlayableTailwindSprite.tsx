import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { LoadableSpriteOption } from "../../../sprites/spritesheet/loadedSpriteSheet";
import type {
  AnimatedTextureTailwindClass,
  TextureTailwindClass,
} from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";

import { twClass } from "../../../editor/twClass";
import { spritesheetMetas } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetas";
import { useAppSelector } from "../../../store/hooks";
import { selectSpritesOption } from "../../../store/slices/gameMenus/gameMenusSelectors";

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
        return twClass("texture-animated-head_idle_away");
      case "towards":
        return twClass("texture-animated-head_idle_towards");
      case "left":
        return twClass("texture-animated-head_idle_left");
      case "right":
        return twClass("texture-animated-head_idle_right");
      case "awayRight":
        return twClass("texture-animated-head_idle_awayRight");
      case "towardsRight":
        return twClass("texture-animated-head_idle_towardsRight");
      case "towardsLeft":
        return twClass("texture-animated-head_idle_towardsLeft");
      case "awayLeft":
        return twClass("texture-animated-head_idle_awayLeft");
      default:
        facingXy8 satisfies never;
        throw new Error(`Invalid facingXy8: ${facingXy8}`);
    }
  }

  const { standing } = directionFrames ?? {};
  if (standing === true) {
    switch (facingXy8) {
      case "away":
        return twClass("texture-head_standing_away");
      case "towards":
        return twClass("texture-head_standing_towards");
      case "left":
        return twClass("texture-head_standing_left");
      case "right":
        return twClass("texture-head_standing_right");
      case "awayRight":
        return twClass("texture-head_standing_awayRight");
      case "towardsRight":
        return twClass("texture-head_standing_towardsRight");
      case "towardsLeft":
        return twClass("texture-head_standing_towardsLeft");
      case "awayLeft":
        return twClass("texture-head_standing_awayLeft");
      default:
        facingXy8 satisfies never;
        throw new Error(`Invalid facingXy8: ${facingXy8}`);
    }
  }

  const walkFrame = standing ?? 2;
  switch (facingXy8) {
    case "away":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_away_1")
        : walkFrame === 3 ? twClass("texture-head_walking_away_3")
        : twClass("texture-head_walking_away_2")
      );
    case "towards":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_towards_1")
        : walkFrame === 3 ? twClass("texture-head_walking_towards_3")
        : twClass("texture-head_walking_towards_2")
      );
    case "left":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_left_1")
        : walkFrame === 3 ? twClass("texture-head_walking_left_3")
        : twClass("texture-head_walking_left_2")
      );
    case "right":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_right_1")
        : walkFrame === 3 ? twClass("texture-head_walking_right_3")
        : twClass("texture-head_walking_right_2")
      );
    case "awayRight":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_awayRight_1")
        : walkFrame === 3 ? twClass("texture-head_walking_awayRight_3")
        : twClass("texture-head_walking_awayRight_2")
      );
    case "towardsRight":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_towardsRight_1")
        : walkFrame === 3 ? twClass("texture-head_walking_towardsRight_3")
        : twClass("texture-head_walking_towardsRight_2")
      );
    case "towardsLeft":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_towardsLeft_1")
        : walkFrame === 3 ? twClass("texture-head_walking_towardsLeft_3")
        : twClass("texture-head_walking_towardsLeft_2")
      );
    case "awayLeft":
      return (
        walkFrame === 1 ? twClass("texture-head_walking_awayLeft_1")
        : walkFrame === 3 ? twClass("texture-head_walking_awayLeft_3")
        : twClass("texture-head_walking_awayLeft_2")
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
        return twClass("texture-animated-heels_idle_away");
      case "towards":
        return twClass("texture-animated-heels_idle_towards");
      case "left":
        return twClass("texture-animated-heels_idle_left");
      case "right":
        return twClass("texture-animated-heels_idle_right");
      case "awayRight":
        return twClass("texture-animated-heels_idle_awayRight");
      case "towardsRight":
        return twClass("texture-animated-heels_idle_towardsRight");
      case "towardsLeft":
        return twClass("texture-animated-heels_idle_towardsLeft");
      case "awayLeft":
        return twClass("texture-animated-heels_idle_awayLeft");
      default:
        facingXy8 satisfies never;
        throw new Error(`Invalid facingXy8: ${facingXy8}`);
    }
  }

  const { standing } = directionFrames ?? {};
  if (standing === true) {
    switch (facingXy8) {
      case "away":
        return twClass("texture-heels_standing_away");
      case "towards":
        return twClass("texture-heels_standing_towards");
      case "left":
        return twClass("texture-heels_standing_left");
      case "right":
        return twClass("texture-heels_standing_right");
      case "awayRight":
        return twClass("texture-heels_standing_awayRight");
      case "towardsRight":
        return twClass("texture-heels_standing_towardsRight");
      case "towardsLeft":
        return twClass("texture-heels_standing_towardsLeft");
      case "awayLeft":
        return twClass("texture-heels_standing_awayLeft");
      default:
        facingXy8 satisfies never;
        throw new Error(`Invalid facingXy8: ${facingXy8}`);
    }
  }

  const walkFrame = standing ?? 2;
  switch (facingXy8) {
    case "away":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_away_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_away_3")
        : twClass("texture-heels_walking_away_2")
      );
    case "towards":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_towards_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_towards_3")
        : twClass("texture-heels_walking_towards_2")
      );
    case "left":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_left_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_left_3")
        : twClass("texture-heels_walking_left_2")
      );
    case "right":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_right_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_right_3")
        : twClass("texture-heels_walking_right_2")
      );
    case "awayRight":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_awayRight_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_awayRight_3")
        : twClass("texture-heels_walking_awayRight_2")
      );
    case "towardsRight":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_towardsRight_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_towardsRight_3")
        : twClass("texture-heels_walking_towardsRight_2")
      );
    case "towardsLeft":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_towardsLeft_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_towardsLeft_3")
        : twClass("texture-heels_walking_towardsLeft_2")
      );
    case "awayLeft":
      return (
        walkFrame === 1 ? twClass("texture-heels_walking_awayLeft_1")
        : walkFrame === 3 ? twClass("texture-heels_walking_awayLeft_3")
        : twClass("texture-heels_walking_awayLeft_2")
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
              return twClass("texture-animated-head_walking_away");
            case "towards":
              return twClass("texture-animated-head_walking_towards");
            case "left":
              return twClass("texture-animated-head_walking_left");
            case "right":
              return twClass("texture-animated-head_walking_right");
            case "awayRight":
              return twClass("texture-animated-head_walking_awayRight");
            case "towardsRight":
              return twClass("texture-animated-head_walking_towardsRight");
            case "towardsLeft":
              return twClass("texture-animated-head_walking_towardsLeft");
            case "awayLeft":
              return twClass("texture-animated-head_walking_awayLeft");
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
              return twClass("texture-animated-heels_walking_away");
            case "towards":
              return twClass("texture-animated-heels_walking_towards");
            case "left":
              return twClass("texture-animated-heels_walking_left");
            case "right":
              return twClass("texture-animated-heels_walking_right");
            case "awayRight":
              return twClass("texture-animated-heels_walking_awayRight");
            case "towardsRight":
              return twClass("texture-animated-heels_walking_towardsRight");
            case "towardsLeft":
              return twClass("texture-animated-heels_walking_towardsLeft");
            case "awayLeft":
              return twClass("texture-animated-heels_walking_awayLeft");
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
  const loadable: LoadableSpriteOption =
    spriteOption === "Speccy" ? "BlockStack" : spriteOption;

  return (args: {
    character: IndividualCharacterName;
    facingXy8: DirectionXy8;
    action: "idle" | "walking";
  }) => playableTailwindSpriteClassname({ ...args, spritesheetName: loadable });
};
