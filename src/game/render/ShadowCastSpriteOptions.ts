import {
  type AnimationId,
  type TextureId,
} from "../../sprites/spritesheet/spritesheetData/makeSpritesheetData";

export type ShadowCastSpriteOptions =
  | {
      textureId: TextureId;
      animationId?: undefined;
      flipX?: boolean;
    }
  | {
      textureId?: undefined;
      animationId: AnimationId;
      flipX?: boolean;
    };
