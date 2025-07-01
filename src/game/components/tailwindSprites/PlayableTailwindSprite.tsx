import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { AnimationId, TextureId } from "../../../sprites/spriteSheetData";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";
import type { SanitisedForClassName } from "./SanitiseForClassName";

export const playableTailwindSpriteClassname = ({
  facingXy8,
  character,
  action,
}: {
  character: IndividualCharacterName;
  facingXy8: DirectionXy8;
  action: "walking" | "idle";
}):
  | `texture-animated-${SanitisedForClassName<AnimationId>}`
  | `texture-${SanitisedForClassName<TextureId>}` => {
  // keep tailwind happy by listing all the classnames

  switch (character) {
    case "head": {
      switch (action) {
        case "walking": {
          switch (facingXy8) {
            case "away":
              return "texture-animated-head_walking_away";
            case "towards":
              return "texture-animated-head_walking_towards";
            case "left":
              return "texture-animated-head_walking_left";
            case "right":
              return "texture-animated-head_walking_right";
            case "awayRight":
              return "texture-animated-head_walking_awayRight";
            case "towardsRight":
              return "texture-animated-head_walking_towardsRight";
            case "towardsLeft":
              return "texture-animated-head_walking_towardsLeft";
            case "awayLeft":
              return "texture-animated-head_walking_awayLeft";
            default:
              facingXy8 satisfies never;
              throw new Error(`Invalid facingXy8: ${facingXy8}`);
          }
        }
        case "idle": {
          switch (facingXy8) {
            case "towards":
              return "texture-animated-head_idle_towards";
            case "right":
              return "texture-animated-head_idle_right";
            case "awayRight":
              return "texture-animated-head_idle_awayRight";
            case "towardsRight":
              return "texture-animated-head_idle_towardsRight";
            case "towardsLeft":
              return "texture-animated-head_idle_towardsLeft";
            case "away":
              return "texture-head_walking_away_2";
            case "left":
              return "texture-head_walking_left_2";
            case "awayLeft":
              return "texture-head_walking_awayLeft_2";
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
              return "texture-animated-heels_walking_away";
            case "towards":
              return "texture-animated-heels_walking_towards";
            case "left":
              return "texture-animated-heels_walking_left";
            case "right":
              return "texture-animated-heels_walking_right";
            case "awayRight":
              return "texture-animated-heels_walking_awayRight";
            case "towardsRight":
              return "texture-animated-heels_walking_towardsRight";
            case "towardsLeft":
              return "texture-animated-heels_walking_towardsLeft";
            case "awayLeft":
              return "texture-animated-heels_walking_awayLeft";
            default:
              facingXy8 satisfies never;
              throw new Error(`Invalid facingXy8: ${facingXy8}`);
          }
        }
        case "idle": {
          switch (facingXy8) {
            case "towards":
              return "texture-heels_walking_towards_2";
            case "right":
              return "texture-heels_walking_right_2";
            case "awayRight":
              return "texture-heels_walking_awayRight_2";
            case "towardsRight":
              return "texture-heels_walking_towardsRight_2";
            case "towardsLeft":
              return "texture-heels_walking_towardsLeft_2";
            case "away":
              return "texture-heels_walking_away_2";
            case "left":
              return "texture-heels_walking_left_2";
            case "awayLeft":
              return "texture-heels_walking_awayLeft_2";
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
