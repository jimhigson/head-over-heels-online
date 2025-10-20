import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { AnimationId, TextureId } from "../../../sprites/spriteSheetData";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { SanitisedForClassName } from "./SanitiseForClassName";

import { twClass } from "../../../editor/twClass";

export const playableTailwindSpriteClassname = ({
  facingXy8,
  character,
  action,
}: {
  character: IndividualCharacterName;
  facingXy8: DirectionXy8;
  action: "idle" | "walking";
}):
  | `texture-${SanitisedForClassName<TextureId>}`
  | `texture-animated-${SanitisedForClassName<AnimationId>}` => {
  // keep tailwind happy by listing all the classnames

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
        case "idle": {
          switch (facingXy8) {
            case "towards":
              return twClass("texture-animated-head_idle_towards");
            case "right":
              return twClass("texture-animated-head_idle_right");
            case "awayRight":
              return twClass("texture-animated-head_idle_awayRight");
            case "towardsRight":
              return twClass("texture-animated-head_idle_towardsRight");
            case "towardsLeft":
              return twClass("texture-animated-head_idle_towardsLeft");
            case "away":
              return twClass("texture-head_walking_away_2");
            case "left":
              return twClass("texture-head_walking_left_2");
            case "awayLeft":
              return twClass("texture-head_walking_awayLeft_2");
            default:
              facingXy8 satisfies never;
              throw new Error(`Invalid facingXy8: ${facingXy8}`);
          }
        }
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
        case "idle": {
          switch (facingXy8) {
            case "towards":
              return twClass("texture-animated-heels_idle_towards");
            case "right":
              return twClass("texture-animated-heels_idle_right");
            case "awayRight":
              return twClass("texture-heels_walking_awayRight_2");
            case "towardsRight":
              return twClass("texture-animated-heels_idle_towardsRight");
            case "towardsLeft":
              return twClass("texture-heels_walking_towardsLeft_2");
            case "away":
              return twClass("texture-heels_walking_away_2");
            case "left":
              return twClass("texture-heels_walking_left_2");
            case "awayLeft":
              return twClass("texture-heels_walking_awayLeft_2");
            default:
              facingXy8 satisfies never;
              throw new Error(`Invalid facingXy8: ${facingXy8}`);
          }
        }
      }
      break;
    }
  }
};
