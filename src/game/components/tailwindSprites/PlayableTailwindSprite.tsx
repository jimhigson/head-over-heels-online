import type { IndividualCharacterName } from "../../../model/modelTypes";
import type { AnimationId, TextureId } from "../../../sprites/spriteSheetData";
import type { DirectionXy8 } from "../../../utils/vectors/vectors";

export const playableTailwindSpriteClassname = ({
  facingXy8,
  character,
  action,
}: {
  character: IndividualCharacterName;
  facingXy8: DirectionXy8;
  action: "walking" | "idle";
}): `texture-animated-${AnimationId}` | `texture-${TextureId}` => {
  // keep tailwind happy by listing all the classnames

  switch (character) {
    case "head": {
      switch (action) {
        case "walking": {
          switch (facingXy8) {
            case "away":
              return "texture-animated-head.walking.away";
            case "towards":
              return "texture-animated-head.walking.towards";
            case "left":
              return "texture-animated-head.walking.left";
            case "right":
              return "texture-animated-head.walking.right";
            case "awayRight":
              return "texture-animated-head.walking.awayRight";
            case "towardsRight":
              return "texture-animated-head.walking.towardsRight";
            case "towardsLeft":
              return "texture-animated-head.walking.towardsLeft";
            case "awayLeft":
              return "texture-animated-head.walking.awayLeft";
            default:
              facingXy8 satisfies never;
              throw new Error(`Invalid facingXy8: ${facingXy8}`);
          }
        }
        case "idle": {
          switch (facingXy8) {
            case "towards":
              return "texture-animated-head.idle.towards";
            case "right":
              return "texture-animated-head.idle.right";
            case "awayRight":
              return "texture-animated-head.idle.awayRight";
            case "towardsRight":
              return "texture-animated-head.idle.towardsRight";
            case "towardsLeft":
              return "texture-animated-head.idle.towardsLeft";
            case "away":
              return "texture-head.walking.away.2";
            case "left":
              return "texture-head.walking.left.2";
            case "awayLeft":
              return "texture-head.walking.awayLeft.2";
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
              return "texture-animated-heels.walking.away";
            case "towards":
              return "texture-animated-heels.walking.towards";
            case "left":
              return "texture-animated-heels.walking.left";
            case "right":
              return "texture-animated-heels.walking.right";
            case "awayRight":
              return "texture-animated-heels.walking.awayRight";
            case "towardsRight":
              return "texture-animated-heels.walking.towardsRight";
            case "towardsLeft":
              return "texture-animated-heels.walking.towardsLeft";
            case "awayLeft":
              return "texture-animated-heels.walking.awayLeft";
            default:
              facingXy8 satisfies never;
              throw new Error(`Invalid facingXy8: ${facingXy8}`);
          }
        }
        case "idle": {
          switch (facingXy8) {
            case "towards":
              return "texture-heels.walking.towards.2";
            case "right":
              return "texture-heels.walking.right.2";
            case "awayRight":
              return "texture-heels.walking.awayRight.2";
            case "towardsRight":
              return "texture-heels.walking.towardsRight.2";
            case "towardsLeft":
              return "texture-heels.walking.towardsLeft.2";
            case "away":
              return "texture-heels.walking.away.2";
            case "left":
              return "texture-heels.walking.left.2";
            case "awayLeft":
              return "texture-heels.walking.awayLeft.2";
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
