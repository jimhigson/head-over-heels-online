import {
  type AnimationId,
  type TextureId,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";

export type ShadowCastSpriteOptions =
  | {
      textureId: TextureId;
      animationId?: undefined;
      flipX?: boolean;
      /** should we flip the shadow when the camera's x and y is
       * projected as reversed? */
      flipsOnOddQuarterCameraTurns?: boolean;
    }
  | {
      textureId?: undefined;
      animationId: AnimationId;
      flipX?: boolean;
      flipsOnOddQuarterCameraTurns?: boolean;
    };
