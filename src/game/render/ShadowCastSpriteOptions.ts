import {
  type BaseAnimationIdWithPrefix,
  type BaseTextureIdWithPrefix,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";

export type ShadowCastSpriteOptions =
  | {
      textureId: BaseTextureIdWithPrefix<"shadow">;
      animationId?: undefined;
      flipX?: boolean;
      /** should we flip the shadow when the camera's x and y is
       * projected as reversed? */
      flipsOnOddQuarterCameraTurns?: boolean;
    }
  | {
      textureId?: undefined;
      animationId: BaseAnimationIdWithPrefix<"shadow">;
      flipX?: boolean;
      flipsOnOddQuarterCameraTurns?: boolean;
    };
